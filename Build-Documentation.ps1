npm run typedoc:md
Copy-Item .\projects\angular-pharkas-blurhash\README.md .\docs\blurhash.md
Copy-Item .\projects\angular-pharkas-highcharts\README.md .\docs\highcharts.md
Copy-Item .\projects\angular-pharkas-leaflet\README.md .\docs\leaflet.md

npm run build
Remove-Item -Recurse .\docs\demo
Copy-Item -Recurse .\dist\demo .\docs
