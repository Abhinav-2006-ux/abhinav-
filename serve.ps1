$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server started."
Write-Host "Listening on http://localhost:$port/"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ($localPath -eq '') { $localPath = 'index.html' }
        
        $filePath = Join-Path (Get-Location) $localPath
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = 'application/octet-stream'
            if ($ext -eq '.html') { $contentType = 'text/html' }
            elseif ($ext -eq '.css') { $contentType = 'text/css' }
            elseif ($ext -eq '.js') { $contentType = 'application/javascript' }
            elseif ($ext -eq '.jpg' -or $ext -eq '.jpeg') { $contentType = 'image/jpeg' }
            elseif ($ext -eq '.png') { $contentType = 'image/png' }
            
            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
