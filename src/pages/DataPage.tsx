import { Button } from '@/components/base/buttons/button';
import { ProgressBar } from '@/components/base/progress-indicators/progress-indicators';
import AppPageHeader from '@/components/shared/layout/AppPageHeader'
import { localStorageKeys } from '@/consts/localStorageKeys';
import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'react-aria-components';

export default function DataPage() {
    const importButtonRef = useRef<HTMLInputElement | null>(null)
    const MAX_BYTES = 5 * 1024 * 1024;
    const [usagePercent, setUsagePercent] = useState(0);
    const [usageText, setUsageText] = useState("");

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

    function formatBytesToMB(bytes: number) {
        return (bytes / (1024 * 1024)).toFixed(1) + "MB";
    }

    function getLocalStorageSize() {
        let total = 0
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += (localStorage[key].length + key.length)
            }
        } return total
    }

    const refreshUsage = () => {
        const size = getLocalStorageSize();
        const percent = Math.min((size / MAX_BYTES) * 100, 100);
        setUsagePercent(percent);
        const usageText = `${formatBytesToMB(size)} / ${formatBytesToMB(MAX_BYTES)}`;
        setUsageText(usageText);
    };

    useEffect(() => {
        refreshUsage();
    }, []);

    return (
        <>
            <AppPageHeader headerTitle='Import / Export your Data' />
            <div className='text-primary w-1/2 flex flex-col gap-2'>
                <span>Current use of resources: {usageText}</span>
                <ProgressBar labelPosition="bottom" min={0} max={100} value={usagePercent} />
            </div>
            <div className='flex gap-4 items-center'>
                <Button className='text-primary' onClick={exportData}>Export</Button>
                <Button className='text-primary' onClick={() => importButtonRef.current?.click()}>Import</Button>
                <Input ref={importButtonRef} type="file" accept="application/json" onChange={importData} className='text-primary hidden' placeholder='Import data' />
            </div>

        </>

    )
}
