<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
		<title>Papyrus CMS Suite</title>
		
		<!-- stylesheets -->
		<link rel="stylesheet" type="text/css" href="css/layout.css" />
		<link rel="stylesheet" type="text/css" href="css/tooltip.css" />
		<link rel="stylesheet" type="text/css" href="css/infobox/infobox-core.css" />
		<link rel="stylesheet" type="text/css" href="css/infobox/infobox.css" />
		
		<!-- yahoo -->
		
		<!-- Load the YUI Loader script: -->
		<script type="text/javascript" src="lib/yui/yuiloader/yuiloader-beta.js"></script>
		
		<script type="text/javascript">
		// Instantiate and configure Loader:
		var loader = new YAHOO.util.YUILoader({
			
			// Specify base path
			base : "lib/yui/",
			
		    // Identify the components you want to load.  Loader will automatically identify
		    // any additional dependencies required for the specified components.
		    require: [ "reset-fonts-grids", "base", "menu", "logger", "yuitest", "ejs", "followme", "papyrus", "papyruseditor", "papyruspageeditor", "papyrussectionseditor", "papyrussectioneditor" ],

		    // Configure loader to pull in optional dependencies.  For example, animation
		    // is an optional dependency for slider.
		    loadOptional: true,		
			
			// Use rolled up files instead of loading individual components
			allowRollup : false,
			
			// Use non-minified versions of files
			filter : "RAW",
			
		    // The function to call when all script/css resources have been loaded
		    onSuccess: function() {
				
				// Navigation Menu
				var navMenu = new YAHOO.widget.MenuBar( "navmenu", { autosubmenudisplay : true } );
				navMenu.render();
			
				// FollowMe Containers
				var leftPods = new YAHOO.widget.FollowMe( "pui-left-pods", "content-container" );
				var rightPods = new YAHOO.widget.FollowMe( "pui-right-pods", "content-container" );	
				
				// Papyrus Editor
				YAHOO.util.Event.onDOMReady( YAHOO.widget.papyrus.Editor.init, {}, YAHOO.widget.papyrus.Editor );
				
				// YUI Logger
				//new YAHOO.widget.LogReader(); 
				
				// Tests
				//YAHOO.tool.TestRunner.run(); 
				
		    }
		});
		
		// Custom modules
		loader.addModule( {
			name : "ejs",
			type : "js",
			fullpath : "scripts/ejs/ejs.js"
		} );
		loader.addModule( {
			name : "followme",
			type : "js",
			fullpath : "lib/pui/followme/followme.js",
			requires : [ "event", "dom", "animation", "followmecss" ]
		} );
		loader.addModule( {
			name : "followmecss",
			type : "css",
			fullpath : "lib/pui/followme/assets/followme-core.css"
		} );
		loader.addModule( {
			name : "papyrus",
			type : "js",
			fullpath : "lib/pui/papyrus/papyrus.js",
			requires : [ "event", "dom", "animation", "papyruscorecss", "papyruscss" ]
		} );
		loader.addModule( {
			name : "papyruscorecss",
			type : "css",
			fullpath : "lib/pui/papyrus/assets/papyrus-core.css"
		} );
		loader.addModule( {
			name : "papyruscss",
			type : "css",
			fullpath : "lib/pui/papyrus/assets/papyrus.css"
		} );
		loader.addModule( {
			name : "papyruseditor",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/editor.js",
			requires : [ "event", "dom", "animation", "container", "button", "papyrus", "papyruseditorcss" ]
		} );
		loader.addModule( {
			name : "papyruseditorcss",
			type : "css",
			fullpath : "lib/pui/papyrus/assets/editor.css"
		} );
		// Page Editor - We'll combine and minify these into one file for production
		loader.addModule( {
			name : "papyruspageeditormodel",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/page/model.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyruspageeditorview",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/page/view.js",
			requires : [ "papyrus", "ejs", "event" ]
		} );
		loader.addModule( {
			name : "papyruspageeditorcontroller",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/page/controller.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyruspageeditorpage",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/page/page.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyruspageeditor",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/page/editor.js",
			requires : [ "papyruseditor", "papyruspageeditormodel", "papyruspageeditorview", "papyruspageeditorcontroller", "papyruspageeditorpage" ]
		} );
		// Sections Editor - We'll combine and minify these into one file for production
		loader.addModule( {
			name : "papyrussectionseditormodel",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/sections/model.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyrussectionseditorview",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/sections/view.js",
			requires : [ "papyrus", "ejs", "event" ]
		} );
		loader.addModule( {
			name : "papyrussectionseditorcontroller",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/sections/controller.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyrussections",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/sections/sections.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyrussectionseditor",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/sections/editor.js",
			requires : [ "papyruseditor", "papyrussectionseditormodel", "papyrussectionseditorview", "papyrussectionseditorcontroller", "papyrussections" ]
		} );
		// Section Editor - We'll combine and minify these into one file for production
		loader.addModule( {
			name : "papyrussectioneditormodel",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/section/model.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyrussectioneditorview",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/section/view.js",
			requires : [ "papyrus", "ejs", "event" ]
		} );
		loader.addModule( {
			name : "papyrussectioneditorcontroller",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/section/controller.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyrussection",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/section/section.js",
			requires : [ "papyrus" ]
		} );
		loader.addModule( {
			name : "papyrussectioneditor",
			type : "js",
			fullpath : "lib/pui/papyrus/editor/section/editor.js",
			requires : [ "papyruseditor", "papyrussectioneditormodel", "papyrussectioneditorview", "papyrussectioneditorcontroller", "papyrussection" ]
		} );
		// Load the files using the insert() method. The insert method takes an optional
		// configuration object, and in this case we have configured everything in
		// the constructor, so we don't need to pass anything to insert().
		loader.insert();

		</script>

		
		<style type="text/css">	
			 /* Patch to nest "GE" inside a "GF" */
			 /* We're trying to obtain a [ 1/4, 2/4, 1/4 ] layout */
			 /* http://tech.groups.yahoo.com/group/ydn-javascript/message/22384 */
			.yui-gf .yui-ge .yui-u { float: left; width: 24%; margin-left: 2%; *margin-left: 1.9%; }
			.yui-gf .yui-ge div.first { margin-left: 0; width: 50.0%; } /* Adjusted width to be correct */
			/* End patch */
		</style>
		
	</head>
	<body class="yui-skin-sam"><!-- Define default skin -->
		<div id="doc4"><!-- 974px width, centered -->
			<div id="hd"><!-- header -->
				<cfinclude template="views/menu.cfm" />
			</div>
			<div id="bd"><!-- body -->
				<div class="yui-gf">
					<div class="yui-u first">
						<div id="pui-left-pods" class="pui-followme">
							<div class="pod">Page Sections</div>
							<div class="pod">Looking For...</div>
						</div>
					</div>
					<div class="yui-ge">
						<div class="yui-u first">
							<div id="content-container">
								<div id="content-header">Papyrus CMS Suite <a href="#" id="papyrus-edit-page" onclick="YAHOO.widget.papyrus.Editor.open( '1', 'page' );">Edit Page</a></div>
								<div id="content"><!-- CONTENT BEGIN -->
									
									<div class="content-section papyrus-content-type-section">
										<div class="yui-gc">
											<div class="yui-u first content-heading">Text Section</div>
											<div class="yui-u papyrus-edit-section-link"><a href="#" onclick="YAHOO.widget.papyrus.Editor.open( '1', 'section' );">Edit Section</a></div>
										</div>
										<div class="content-body papyrus-editable papyrus-content-type-text">this is the 3rd content record ... should be a nice long page of nothingElitr labore. Amet iriure elitr duo hendrerit sea laoreet vero dolor suscipit. Clita labore dolore ut dolor nulla dolore lorem. Suscipit sit veniam magna lorem. Tempor ut elitr at takimata diam tincidunt dolor vulputate. Nulla erat cum sadipscing. Dolore stet lorem qui vero aliquam clita sadipscing. Sit sed voluptua. Autem odio sit gubergren ea dolor. Labore diam illum lorem elitr feugiat nulla dolor dignissim est sea. Eirmod eos volutpat clita vel magna zzril est diam et feugiat. Et molestie invidunt stet diam autem dolore ut vulputate rebum rebum. Erat et sea delenit nulla dolores. Duo duo et. Ipsum eu at ut voluptua in et eirmod. Lobortis accumsan aliquyam dolore lorem dolor tation vel. Sea nonumy sanctus. Luptatum hendrerit. Erat nobis amet et nostrud et erat dolor justo takimata. Takimata nonumy sea praesent at. Takimata praesent vel et dolore dolor qui ipsum. Dolor kasd consectetuer sit stet. Et sanctus clita ea ullamcorper accusam eos vulputate nonumy. Tincidunt ut ipsum eos lorem. Dolor illum aliquip. Est sanctus eirmod voluptua accusam amet ut augue ullamcorper elitr. Tincidunt wisi voluptua ipsum ipsum. Dolore ea. Diam sit nonumy et. Clita lorem sit suscipit hendrerit. Ut at illum rebum suscipit sit. Ipsum facilisi nonumy ea sit dolor. Suscipit nulla consetetur et labore ut lorem eirmod sanctus vel ut. At labore tempor et elit dolor iusto dolore eirmod nobis sea. Suscipit rebum aliquam labore dolore nonumy iriure nonumy et. Dolor sadipscing ipsum consetetur justo. Eu in accusam lorem accusam. Facilisis gubergren lorem vulputate ut lobortis adipiscing hendrerit. Dolores vero amet erat kasd feugiat tempor sanctus nonumy. Magna rebum dolores. Sit dolores at sed. Sed et kasd clita hendrerit wisi nonumy lorem et diam. Sed minim erat dolore velit ex sed. Invidunt duis facilisis. Justo et labore. Amet eos amet takimata dolor eos sed et et. Kasd gubergren facilisis eirmod. Labore justo rebum amet magna justo kasd et est. Sit diam et volutpat nonumy nonumy amet dolore lorem. Dolore erat accusam gubergren. Tincidunt et accusam sed sea. Sed duo. Illum rebum. Amet at. Illum ipsum eos ad duis illum lorem at ea takimata. Magna ut diam hendrerit diam ipsum consetetur erat dignissim ipsum dolores. Ea facilisis. Eos clita suscipit luptatum at amet justo eros esse in dolore. Eum dolor sit justo hendrerit ea elitr luptatum. Autem zzril duis euismod esse d</div>
									</div>
									
									<div class="content-section papyrus-content-type-section">
										<div class="yui-gc">
											<div class="yui-u first content-heading">Downloads Section</div>
											<div class="yui-u papyrus-edit-section-link"><a href="#" onclick="YAHOO.widget.papyrus.Editor.open( '1', 'section' );">Edit Section</a></div>
										</div>
										<div class="content-body papyrus-editable papyrus-content-type-downloads">
											
											<div class="info-box">
												<div class="info-box-row">
													<table class="odd">
														<tr>
															<td><a href="#">SuccessMaker R1 Positioning Framework</a>&nbsp;&nbsp;06/20/01&nbsp;&nbsp;</td>
															<td align="right"><a class="tooltip" href="javascript:;"><img src="img/page_white_acrobat.gif" /><span>Adobe Acrobat Document</span></a>&nbsp;&nbsp;&nbsp;<a class="tooltip" href="javascript:;"><img src="img/world.gif" alt="world" /><span>Customer Facing</span></a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="download-detail"><img border="0" src="img/page_white_magnify.gif" alt="Download Details" /></a></td>
														</tr>
													</table>
												</div>
												<div class="info-box-row-detail">
													<table>
														<tr>
															<td><span class="info-box-field">Size:</span> <span class="info-box-field-data">76 KB</span></td>
															<td><span class="info-box-field">Posted:</span> <span class="info-box-field-data">06/20/01</span></td>
															<td><span class="info-box-field">Updated:</span> <span class="info-box-field-data">N/A</span></td>
															<td><span class="info-box-field">Posted By:</span> <span class="info-box-field-data">Caige Nichols</span></td>
														</tr>
													</table>
												</div>
											
												<div class="info-box-row">
													<table>
														<tr>
															<td><a href="#">WTW/EL Sell Sheet</a>&nbsp;&nbsp;06/20/01&nbsp;&nbsp;</td>
															<td align="right"><a class="tooltip" href="javascript:;"><img src="img/page_white_acrobat.gif" /><span>Adobe Acrobat Document</span></a>&nbsp;&nbsp;&nbsp;<a class="tooltip" href="javascript:;"><img src="img/world.gif" alt="world" /><span>Customer Facing</span></a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="download-detail"><img border="0" src="img/page_white_magnify.gif" alt="Download Details" /></a></td>
														</tr>
													</table>
												</div>
												<div class="info-box-row-detail">
													<table>
														<tr>
															<td><span class="info-box-field">Size:</span> <span class="info-box-field-data">76 KB</span></td>
															<td><span class="info-box-field">Posted:</span> <span class="info-box-field-data">06/20/01</span></td>
															<td><span class="info-box-field">Updated:</span> <span class="info-box-field-data">N/A</span></td>
															<td><span class="info-box-field">Posted By:</span> <span class="info-box-field-data">Caige Nichols</span></td>
														</tr>
													</table>
												</div>
											
												<div class="info-box-row">
													<table class="odd">
														<tr>
															<td><a href="#">Grants and RFP Revenue Tracker</a>&nbsp;&nbsp;06/20/01&nbsp;&nbsp;</td>
															<td align="right"><a class="tooltip" href="javascript:;"><img src="img/page_white_acrobat.gif" /><span>Adobe Acrobat Document</span></a>&nbsp;&nbsp;&nbsp;<a class="tooltip" href="javascript:;"><img src="img/world.gif" alt="world" /><span>Customer Facing</span></a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="download-detail"><img border="0" src="img/page_white_magnify.gif" alt="Download Details" /></a></td>
														</tr>
													</table>
												</div>
												<div class="info-box-row-detail">
													<table>
														<tr>
															<td><span class="info-box-field">Size:</span> <span class="info-box-field-data">76 KB</span></td>
															<td><span class="info-box-field">Posted:</span> <span class="info-box-field-data">06/20/01</span></td>
															<td><span class="info-box-field">Updated:</span> <span class="info-box-field-data">N/A</span></td>
															<td><span class="info-box-field">Posted By:</span> <span class="info-box-field-data">Caige Nichols</span></td>
														</tr>
													</table>
												</div>
											</div>
											
										</div>
									</div>
									
									<div class="content-section papyrus-content-type-section">
										<div class="yui-gc">
											<div class="yui-u first content-heading">Link Section</div>
											<div class="yui-u papyrus-edit-section-link"><a href="#" onclick="YAHOO.widget.papyrus.Editor.open( '1', 'section' );">Edit Section</a></div>
										</div>
										<div class="content-body papyrus-editable papyrus-content-type-link"><ul><li><a href="#">Waterford</a></li><li><a href="#">KnowledgeBox</a></li><li><a href="#">ELLIS</a></li></ul></div>
									</div>
									
									<div class="content-section papyrus-content-type-section">
										<div class="yui-gc">
											<div class="yui-u first content-heading">Image Section</div>
											<div class="yui-u papyrus-edit-section-link"><a href="#" onclick="YAHOO.widget.papyrus.Editor.open( '1', 'section' );">Edit Section</a></div>
										</div>
										<div class="content-body papyrus-editable papyrus-content-type-image"><ul><li><img src="img/DogObedienceTraining.jpg" /></li></ul></div>
									</div>
									
								</div><!-- END CONTENT -->
							</div>
						</div>
						<div class="yui-u">
							<div id="pui-right-pods" class="pui-followme">
								<div class="pod">My Toolbox</div>
								<div class="pod">Editing Toolbox</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="ft"><!-- footer -->
				Copyright &copy; 2008 Pearson Education, Inc. and/or one or more of its direct or indirect affiliates. All rights reserved.
			</div>
		</div>
		
		<!-- Papyrus Components -->
		<!--
		<div id="papyrus-editor-panel">
			<div class="hd"></div>
			<div class="bd"></div>
			<div class="ft"><input type="button" id="papyrus-editor-close-button" name="papyrus-editor-close-button" value="Close This Bitch" />&nbsp;&nbsp;<input type="button" id="papyrus-editor-save-button" name="papyrus-editor-save-button" value="Save" /></div>
		</div>
		-->
		
	</body>
</html>
