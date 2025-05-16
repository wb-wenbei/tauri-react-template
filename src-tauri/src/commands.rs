use tauri::command;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;
use std::time::Duration;
use std::thread;

#[command]
pub fn read_gpio(pin: u32) -> Result<String, String> {
    let export_path = "/sys/class/gpio/export";
    let direction_path = format!("/sys/class/gpio/gpio{}/direction", pin);
    let value_path = format!("/sys/class/gpio/gpio{}/value", pin);

    // 检查GPIO是否已导出，如果没有则导出
    if !Path::new(&value_path).exists() {
        match File::create(export_path).and_then(|mut file| write!(file, "{}", pin)) {
            Ok(_) => {
                // 等待GPIO导出完成
                thread::sleep(Duration::from_millis(100));
            },
            Err(e) => return Err(format!("Failed to export GPIO {}: {}", pin, e)),
        }
    }

    // 设置GPIO方向为输入（如果尚未设置）
    if let Ok(mut file) = File::create(&direction_path) {
        let _ = write!(file, "in");
    }

    // 读取GPIO值
    let mut file = match File::open(&value_path) {
        Ok(f) => f,
        Err(e) => return Err(format!("Failed to open GPIO {} value: {}", pin, e)),
    };

    let mut value = String::new();
    match file.read_to_string(&mut value) {
        Ok(_) => Ok(value.trim().to_string()),
        Err(e) => Err(format!("Failed to read GPIO {} value: {}", pin, e)),
    }
}

#[command]
pub fn write_gpio(pin: u32, value: &str) -> Result<(), String> {
    let export_path = "/sys/class/gpio/export";
    let direction_path = format!("/sys/class/gpio/gpio{}/direction", pin);
    let value_path = format!("/sys/class/gpio/gpio{}/value", pin);

    // 检查GPIO是否已导出，如果没有则导出
    if !Path::new(&value_path).exists() {
        match File::create(export_path).and_then(|mut file| write!(file, "{}", pin)) {
            Ok(_) => {
                // 等待GPIO导出完成
                thread::sleep(Duration::from_millis(100));
            },
            Err(e) => return Err(format!("Failed to export GPIO {}: {}", pin, e)),
        }
    }

    // 设置GPIO方向为输出
    match File::create(&direction_path).and_then(|mut file| write!(file, "out")) {
        Ok(_) => (),
        Err(e) => return Err(format!("Failed to set GPIO {} direction: {}", pin, e)),
    }

    // 写入GPIO值
    match File::create(&value_path).and_then(|mut file| write!(file, "{}", value)) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to write GPIO {} value: {}", pin, e)),
    }
}

#[command]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust, {}!", name)
}

#[command]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}