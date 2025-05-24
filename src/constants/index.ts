export interface DataItem {
  key: string
  title: string
  value: number
  unit: string
}

export const SAVED_DATA_LIST: DataItem[] = [
  {
    key: 'saved_energy',
    title: '累计节省电耗',
    value: 46944,
    unit: 'kwh/m³',
  },
  {
    key: 'saved_chemical_medicine',
    title: '累计节省药耗',
    value: 97,
    unit: 'mg/m³',
  },
  {
    key: 'sludge_reduction',
    title: '累计减少污泥量',
    value: 10944,
    unit: 'kg',
  },
]

export const ONLINE_DATA_IN_LIST: DataItem[] = [
  {
    key: 'influent_COD',
    title: '进水COD',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'influent_TN',
    title: '进水TN',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'influent_TP',
    title: '进水TP',
    unit: 'mg/L',
    value: 0,
  },
]

export const ONLINE_DATA_OUT_LIST: DataItem[] = [
  {
    key: 'effluent_COD',
    title: '出水COD',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'effluent_TN',
    title: '出水TN',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'effluent_TP',
    title: '出水TP',
    unit: 'mg/L',
    value: 0,
  },
]

export const ONLINE_DATA_OTHER_LIST: DataItem[] = [
  {
    key: 'Aerobic_DO',
    title: '生物池末端DO',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'Aerobic_MLSS',
    title: '生物池MLSS',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'SV30',
    title: 'SV30',
    unit: '%',
    value: 0,
  },
]

export const SLUDEG_SIEVE: DataItem = {
  key: 'Sludge_sieve',
  title: '筛分器',
  value: 0,
  unit: '',
}

export const RUN_STATUS_OPTIONS = [
  { label: '启动', value: 'open' },
  { label: '关闭', value: 'close' },
]
