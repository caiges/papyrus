// Set Z-Index higher than the yui mask.
FCKConfig.FloatingPanelsZIndex = 30000;

// Toolbar
FCKConfig.ToolbarSets["Default"] = [
['Source','-','Templates'],
['Cut','Copy','Paste','PasteText','PasteWord','-','SpellCheck'],
['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
'/',
['Bold','Italic','Underline','StrikeThrough','-','Subscript','Superscript'],
['OrderedList','UnorderedList','-','Outdent','Indent','Blockquote'],
['JustifyLeft','JustifyCenter','JustifyRight','JustifyFull'],
['Link','Unlink','Anchor'],
['Image','Flash','Table','Rule','SpecialChar','PageBreak'],
['Style'],
['TextColor','BGColor'],
['FitWindow','ShowBlocks',]
] ;

// Skin
FCKConfig.SkinPath = FCKConfig.BasePath + 'skins/SilverNarrow/' ;
