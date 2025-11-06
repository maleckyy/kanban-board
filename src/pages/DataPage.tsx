import AppPageHeader from '@/components/shared/layout/AppPageHeader'
import { localStorageKeys } from '@/consts/localStorageKeys';
import React from 'react'

export default function DataPage() {

    // experimental - add merging existing data & current saved on localstorage
    function exportData() {
        const data = {
            boardStorage: JSON.parse(localStorage.getItem(localStorageKeys.boardStorage) ?? "{}"),
            tasks: JSON.parse(localStorage.getItem(localStorageKeys.taskStorage) ?? "{}"),
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "backup.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    function importData(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);

                localStorage.setItem(localStorageKeys.boardStorage, JSON.stringify(json.boardStorage || {}));
                localStorage.setItem(localStorageKeys.taskStorage, JSON.stringify(json.tasks || {}));

                alert("Success");
                window.location.reload();
            } catch (err) {
                alert("Error");
            }
        };

        reader.readAsText(file);
    }

    return (
        <div>
            <AppPageHeader headerTitle='Import / Export your Data' />
            <button className='text-primary' onClick={exportData}>Exportuj dane</button>
            <input type="file" accept="application/json" onChange={importData} className='text-primary' />
        </div>

    )
}
