import React, { useEffect, useMemo, useState } from 'react'
import Button from '@/components/Button'
import Toggle from '@/components/Toggle'
import style from './index.module.less'
import { Modal, Slider, Space } from 'antd'
import useSystemStore from '@/stores/system'
import { saveDeviceAttributes } from '@/apis'
import { CONTROL_ADVICE } from '@/constants'
import { getLatestDeviceTimeserieByKey } from '@/utils'

const App: React.FC = () => {
  const [modeModalOpen, setModeModalOpen] = useState(false)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [mode, setMode] = useState('auto')
  const [manualStatus, setManualStatus] = useState('open')
  const [timeClose, setTimeClose] = useState<number>(0)
  const { deviceInfo, deviceList } = useSystemStore()

  const time = deviceInfo?.UpTime

  const adviceTime = useMemo(() => {
    const device = deviceList.find((item) => item.type === CONTROL_ADVICE.key)

    if (!device) return ''

    return getLatestDeviceTimeserieByKey('SludgeScreeningTime', device.latestTimeserie || {})
  }, [deviceList])

  const toggleMode = (e: string) => {
    setModeModalOpen(false)
    if (!deviceInfo?.deviceId) return
    setMode(e)
    const params: Record<string, unknown> = { auto_mode: e === 'auto' }

    if (e === 'auto') {
      params.manual_control = {
        SludgeScreeningTime: {
          StartTime: null,
          StopTime: null,
        },
      }
    }

    saveDeviceAttributes(deviceInfo.deviceId, params).catch(() => {
      setMode(e === 'auto' ? 'manual' : 'auto')
    })
  }

  const toggleStatus = (e: string) => {
    setStatusModalOpen(false)
    if (!deviceInfo?.deviceId) return
    setManualStatus(e)
    const params: DeviceInfo = {
      manual_control: {
        SludgeScreeningTime: {
          StartTime: null,
          StopTime: null,
        },
      },
    }

    if (e === 'open') params.manual_control!.SludgeScreeningTime.StartTime = Date.now()

    saveDeviceAttributes(deviceInfo.deviceId, params as Record<string, unknown>).catch(() => {
      setMode(e === 'auto' ? 'manual' : 'auto')
    })
  }

  const changeCloseTime = (e: number | null) => {
    if (!deviceInfo?.deviceId) return

    const lastValue = timeClose

    setTimeClose(e || 0)

    const SludgeScreeningTime = { ...deviceInfo?.manual_control?.SludgeScreeningTime }
    if (!e) {
      SludgeScreeningTime.StopTime = null
    } else {
      SludgeScreeningTime.StopTime = Date.now() + e * 60 * 60 * 1000
    }

    saveDeviceAttributes(deviceInfo.deviceId, { manual_control: { SludgeScreeningTime } }).catch(() => {
      setTimeClose(lastValue)
    })
  }

  useEffect(() => {
    setMode(deviceInfo?.auto_mode ? 'auto' : 'manual')

    const StartTime = deviceInfo?.manual_control?.SludgeScreeningTime?.StartTime
    const StopTime = deviceInfo?.manual_control?.SludgeScreeningTime?.StopTime

    if (StartTime && Date.now() > StartTime) {
      setManualStatus('open')
      if (!StopTime) {
        setTimeClose(0)
      } else {
        const time = ((StopTime - Date.now()) / (1000 * 60 * 60)).toFixed(1)
        setTimeClose(+time)
      }
    } else {
      setManualStatus('close')
      setTimeClose(0)
    }
  }, [deviceInfo])

  return (
    <>
      <div className={style.container}>
        <div className={style.mode}>
          <div>模式选择</div>
          <Space size="middle">
            <Button
              inactive={mode === 'manual'}
              onClick={() => {
                if (mode === 'manual') setModeModalOpen(true)
              }}
            >
              自动模式
            </Button>
            <Button
              inactive={mode === 'auto'}
              onClick={() => {
                if (mode === 'auto') setModeModalOpen(true)
              }}
            >
              手动模式
            </Button>
          </Space>
        </div>
        {mode === 'auto' && (
          <div className={style.control}>
            <div>
              今日建议开启<span className={style.time}>{adviceTime} </span>min
            </div>
            <div>
              今日开启时间<span className={style.time}>{time}</span>小时
            </div>
          </div>
        )}
        {mode === 'manual' && (
          <div className={style.control}>
            <div className={style.status}>
              设备状态
              <Toggle
                value={manualStatus}
                options={[
                  { label: '关闭', value: 'close' },
                  { label: '开启', value: 'open' },
                ]}
                onChange={() => setStatusModalOpen(true)}
              ></Toggle>
            </div>
            <div className={style.action}>
              运行
              <div className={style.timeCard}>{timeClose}</div>
              <Slider className={style.slider} value={timeClose} step={1} min={0} max={10} onChange={changeCloseTime} />
              小时后关闭
            </div>
          </div>
        )}
      </div>

      <Modal
        title="切换控制模式"
        open={modeModalOpen}
        cancelText="取消"
        okText="确定"
        onOk={() => toggleMode(mode === 'auto' ? 'manual' : 'auto')}
        onCancel={() => setModeModalOpen(false)}
      >
        <p>请确认是否需要切换控制模式</p>
      </Modal>

      <Modal
        title="关闭/开启设备"
        open={statusModalOpen}
        cancelText="取消"
        okText="确定"
        onOk={() => toggleStatus(manualStatus === 'open' ? 'close' : 'open')}
        onCancel={() => setStatusModalOpen(false)}
      >
        <p>请确认是否需要关闭/开启设备</p>
      </Modal>
    </>
  )
}

export default App
