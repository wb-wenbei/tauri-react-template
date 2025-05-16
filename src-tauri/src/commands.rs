use tauri::command;

#[command]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust, {}!", name)
}

#[command]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}