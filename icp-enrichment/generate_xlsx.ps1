param(
  [string]$dir = "c:\Users\samar\Desktop\DEV\SimpleGrid\icp-enrichment"
)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$csv = Join-Path $dir "ICP_Mastersheet_enriched.csv"
$headers = "Company","Industry","Website","EmpSize","Revenue","BizType","Name","Designation","Mobile","HQPhone","Email1","Email2","X1","X2"
$lines = Get-Content -LiteralPath $csv

# edited 0-based source line indices from change log
$editedSet = @{}
Import-Csv -LiteralPath (Join-Path $dir "change_log.csv") | ForEach-Object { $editedSet[[int]$_.line] = $true }

function XmlEsc($s){ if($null -eq $s){return ""}; ($s -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;') }
$colLetters = @('A','B','C','D','E','F','G','H','I','J','K','L','M','N')

$sb = New-Object System.Text.StringBuilder
[void]$sb.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
[void]$sb.Append('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cols><col min="1" max="1" width="34"/><col min="7" max="8" width="26"/><col min="11" max="12" width="34"/></cols><sheetData>')

for($i=0; $i -lt $lines.Count; $i++){
  $rowNum = $i + 1
  $o = $lines[$i] | ConvertFrom-Csv -Header $headers
  $f = @($o.Company,$o.Industry,$o.Website,$o.EmpSize,$o.Revenue,$o.BizType,$o.Name,$o.Designation,$o.Mobile,$o.HQPhone,$o.Email1,$o.Email2,$o.X1,$o.X2)
  $isHeader = ($i -eq 0)
  $isEdited = $editedSet.ContainsKey($i)
  [void]$sb.Append('<row r="' + $rowNum + '">')
  for($c=0; $c -lt 14; $c++){
    $val = $f[$c]
    $hasVal = ($null -ne $val) -and ($val.ToString().Trim().Length -gt 0)
    $ref = $colLetters[$c] + $rowNum
    $style = $null
    if($isHeader){ $style = "2" }
    elseif($isEdited){ $style = "1" }
    if(-not $hasVal){
      # emit empty cell only if it needs a style (header/edited) to color whole row
      if($style){ [void]$sb.Append('<c r="' + $ref + '" s="' + $style + '"/>') }
      continue
    }
    $cell = '<c r="' + $ref + '"'
    if($style){ $cell += ' s="' + $style + '"' }
    $cell += ' t="inlineStr"><is><t xml:space="preserve">' + (XmlEsc ([string]$val)) + '</t></is></c>'
    [void]$sb.Append($cell)
  }
  [void]$sb.Append('</row>')
}
[void]$sb.Append('</sheetData></worksheet>')
$sheetXml = $sb.ToString()

$contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'
$rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
$workbook = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="ICP Mastersheet" sheetId="1" r:id="rId1"/></sheets></workbook>'
$wbRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
$styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFFF00"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" xfId="0" applyFill="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'

$out = Join-Path $dir "ICP_Mastersheet_enriched.xlsx"
if(Test-Path $out){ Remove-Item $out -Force }
$utf8 = New-Object System.Text.UTF8Encoding($false)
$fs = [System.IO.File]::Open($out, [System.IO.FileMode]::Create)
$zip = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)
function AddEntry($zip,$name,$content,$enc){
  $e = $zip.CreateEntry($name, [System.IO.Compression.CompressionLevel]::Optimal)
  $s = $e.Open()
  $bytes = $enc.GetBytes($content)
  $s.Write($bytes,0,$bytes.Length)
  $s.Close()
}
AddEntry $zip "[Content_Types].xml" $contentTypes $utf8
AddEntry $zip "_rels/.rels" $rels $utf8
AddEntry $zip "xl/workbook.xml" $workbook $utf8
AddEntry $zip "xl/_rels/workbook.xml.rels" $wbRels $utf8
AddEntry $zip "xl/styles.xml" $styles $utf8
AddEntry $zip "xl/worksheets/sheet1.xml" $sheetXml $utf8
$zip.Dispose()
$fs.Close()
Write-Output "Wrote $out"
Write-Output ("Rows: {0}, Highlighted: {1}, Sheet bytes: {2}" -f $lines.Count, $editedSet.Count, $sheetXml.Length)