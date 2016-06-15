#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

SetTitleMatchMode, 2

SetView(FontName, FontSize, aa, color)
{
	; Set font settings
	Send, view.run_command("set_setting", {{}"setting": "font_size", "value": %FontSize%{}}){Enter}

	Send, view.run_command("set_setting", {{}"setting": "font_face", "value": "
	SendRaw, %FontName%
	Send, "{}}){Enter}

	Send, view.run_command("set_setting", {{}"setting": "gutter", "value": False{}}){Enter}

	if (color="light"){
		Send, view.run_command("set_setting", {{}"setting": "color_scheme", "value": "Packages/User/Monokai Extended Light_cus.tmTheme"{}}){Enter}
	}else{
		Send, view.run_command("set_setting", {{}"setting": "color_scheme", "value": "Packages/User/Monokai Extended_cus.tmTheme"{}}){Enter}
	}

	; Set AA
	if (aa="aa1"){
		Send, view.run_command("set_setting", {{}"setting": "font_options", "value": []{}}){Enter}
	}else{
		Send, view.run_command("set_setting", {{}"setting": "font_options", "value": ["no_antialias"]{}}){Enter}
	}

	Send, {Esc} ; Close console
	Sleep, 150
}

DoIt(codeLen, color, FontName, FontSize, aa)
{
	; Activate sublime window
	winactivate, Sublime Text
	WinWaitActive, Sublime Text

	; 0-padded font size to two digits
	; paddedSize := ((strlen(FontSize)<2) ? "0"FontSize : FontSize)

	; MsgBox, %FontName% %FontSize% %aa% %codeLen% %color%

	
	; Open sublime console
	Send, ^!c

	; Open short code 
	if (codeLen="short"){
		Send, window.open_file("code_short.txt"){Enter}
	}else{
		Send, window.open_file("code_long.jsx"){Enter}
	}
	
	SetView(FontName, FontSize, aa, color)

	; ss_filename = C:\code\font_compare\capture\ss\
	; ss_filename = %ss_filename%testwindow.open_file("code_short.txt")
	; MsgBox, %ss_filename%

	FontNameDashed := RegExReplace(FontName, " ", "-")
	FontNameDashed := RegExReplace(FontNameDashed, "/", "-")

	FontSizeStr := ""
	if (codeLen="long"){
		FontSizeStr := FontSize
	}else{
		if (FontSize > 15){
			FontSizeStr := "big"
		}else{
			FontSizeStr := "small"
		}
	}

	Run, c:\code\font_compare\capture\nircmd.exe savescreenshotwin "C:\code\font_compare\capture\ss\%codeLen%_%color%_%FontNameDashed%_%FontSizeStr%_aa2.png"
}

Loop, read, c:\code\font_compare\capture\ahk_input.csv
{
    Loop, parse, A_LoopReadLine, CSV
    {
    	Field%A_Index% := A_LoopField
    }
    if (Field5="aa1"){
    	DoIt(Field1, Field2, Field3, Field4, Field5)
    }
}
