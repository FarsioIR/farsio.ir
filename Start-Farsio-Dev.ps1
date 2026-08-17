$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

& {
    $ProjectRoot =
        $PSScriptRoot

    $NodeDirectory =
        Join-Path `
            $env:LOCALAPPDATA `
            "Farsio\tools\node-v24.19.0\extracted\node-v24.19.0-win-x64"

    $NpmCmd =
        Join-Path $NodeDirectory "npm.cmd"

    if (-not (Test-Path -LiteralPath $NpmCmd -PathType Leaf)) {
        throw "Portable Farsio npm not found."
    }

    $env:PATH =
        $NodeDirectory +
        [System.IO.Path]::PathSeparator +
        $env:PATH

    $Port =
        4321

    if ($args.Count -ge 1) {
        $Port =
            [int]$args[0]
    }

    Set-Location $ProjectRoot

    Write-Host ""
    Write-Host "=== Farsio.ir development server ===" `
        -ForegroundColor Cyan
    Write-Host "URL: http://127.0.0.1:$Port/fa"
    Write-Host ""

    & $NpmCmd run dev -- `
        --host 127.0.0.1 `
        --port $Port `
        --strictPort
}