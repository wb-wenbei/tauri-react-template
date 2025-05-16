// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands; 

fn main() {
    let context = tauri::generate_context!();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::add,
        ])
        .run(context)
        .expect("error while running Tauri application");
}
