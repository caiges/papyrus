
PDL.widget.VideoDialog = new function() {	

	this.init = function () {
		this.videoDlg = new YAHOO.widget.Dialog("videoDialog", { 
			effect:[{effect:YAHOO.widget.ContainerEffect.FADE,duration:0.45}],
			modal:true, 
			visible:false, 
			fixedcenter:true, 
			constraintoviewport:true, 
			draggable:true,
			underlay:"none"		
			});
		
		this.videoGroups = {};		
		this.initVideoDialog();
		this.onRender = new YAHOO.util.CustomEvent( "onRender" );	
		this.onDestroy = new YAHOO.util.CustomEvent( "onDestroy" );
		
	}
	
	
	//<img src="'+PDL.util.PageURL.getURL()+'/img/videoDialog/videoshelf.gif" />
	//<img src="'+PDL.util.PageURL.getURL()+'/img/cancel_red2.gif" style="vertical-align:text-top;" />
	
	this.initVideoDialog = function () {
		var vc = document.getElementById("videoDialog");
		vc.innerHTML = '<div id="videoPlayerContent" style="margin: 10px;border: 1px solid white;"></div>'+
			'<div align="center" id="videoPlayerTray" style="color:white;background-color:#999999;position:absolute;bottom:31px;left:10px;display:none;border-top: 1px solid #d2d2d2;border-left: 1px solid #d2d2d2;border-right: 1px solid #d2d2d2;padding-right: 1px;padding-left: 1px;"></div>'+
			'<div align="center" id="videoPlayerControls" style="height:30px;position:absolute;margin:10px;margin-top: 0px;">'+
				'<form><table cellspacing="0" cellpadding="0" border="0" width="100%"><tr>'+
				'<td style="text-align: left;width: 30%;"><a id="VideoDialog_toggleShelfLink" href="javascript:PDL.widget.VideoDialog.toggleVideoPlayerTray();" style="color:white;font-size: 10px;">Video Shelf</a></td>'+
				'<td style="text-align: middle;width: 40%;"><span style="font-size: 11px; color: white;">CMS User Interface Tutorial</span></td>' +
				'<td style="text-align: right;width: 30%;"><a href="javascript:PDL.widget.VideoDialog.hideVideoDialog();" style="color:white;font-size:10px;">Close Player</a>&nbsp;&nbsp;</td>'+
				'</tr></table></form>'+
			'</div>';
		
		this.videoDlg.render();
	}
	
	this.loadVideo = function ( params ) {
		
		this.DlgWidth = params.width;
		this.DlgHeight = params.height;
		this.DlgZindex = params.zindex;
		this.DlgPlayer = params.videoplayer;
		this.DlgVideos = params.videosources;
		this.playIndex = params.index;
		
		this.buildVideoPlayerTray();
		//console.log( this.DlgVideos );
		this.buildVideoPlayerContent( this.DlgVideos[ this.playIndex ].source );
		
		var zInd = YAHOO.util.Dom.getStyle("videoDialog", "zIndex");
		zInd = this.DlgZindex; // Default value in container.CSS
		YAHOO.util.Dom.setStyle("videoDialog_mask", "zIndex", zInd+1);
		YAHOO.util.Dom.setStyle("videoDialog_c", "zIndex", zInd+2);
		YAHOO.util.Dom.setStyle("videoDialog", "background-color", "#666666");
		YAHOO.util.Dom.setStyle("videoDialog", "border", "1px solid #333");
		YAHOO.util.Dom.setStyle("videoDialog_h", "background-color", "#ff6600");
		YAHOO.util.Dom.setStyle("videoDialog_h", "display", "none");
		
		YAHOO.util.Dom.setStyle("videoPlayerControls", "width", this.DlgWidth+'px');
		
		this.videoDlg.cfg.setProperty( "width", this.DlgWidth+20 );
		this.videoDlg.cfg.setProperty( "height", this.DlgHeight+50 );
		
		// hack to remove the close button
		this.videoDlg.close.style.display = "none";
		
		//var vch = document.getElementById("videoDialog_h");
		//vch.innerHTML = 'PDL Videos';
		
		this.displayVideoDialog();
		
	}
	
	this.displayVideoDialog = function () {
		this.videoDlg.center();
		this.videoDlg.element.style.display = "";
		this.videoDlg.show();
		this.onRender.fire();
	}
	
	this.hideVideoDialog = function () {
		this.clearVideoPlayerContent();	
		this.clearVideoPlayerTray();
		this.videoDlg.hide();	
		this.onDestroy.fire();
	}
	
	
	
	
	
	
	this.buildVideoPlayerTray = function () {
		var vtc =  '';
		if( this.DlgVideos.length > 1 ) {
			// width will be reduced by two pixels due to the IE box model
			vtc = '<div style="height:113px;overflow-x:scroll;width:'+(this.DlgWidth-2)+'px;"><table cellspacing="5" cellpadding="3" border="0"><tr>';
			for(var i=0;i<this.DlgVideos.length;i++){
					vtc = vtc+'<td style="border:1px solid white;" align="center"><a href="javascript:PDL.widget.VideoDialog.switchVideoPlayerContent('+i+')" style="color:white;" onmouseover="this.parentNode.style.backgroundColor=\'#666666\'" onmouseout="this.parentNode.style.backgroundColor=\'#999999\'"><img src="'+this.DlgVideos[i].icon+'" /><br/>'+this.DlgVideos[i].name+'</a></td>';
			}
			vtc = vtc+'</tr></table></div>';
			var vpt = document.getElementById("videoPlayerTray");
			vpt.innerHTML = vtc;
		}
	}
	
	this.displayVideoPlayerTray = function () {
		YAHOO.util.Dom.setStyle("videoPlayerTray", "display", "block");
		
		var toggleShelfLinkEl = document.getElementById( "VideoDialog_toggleShelfLink" );
		toggleShelfLinkEl.innerHTML = "Hide Video Shelf";
	}
	
	this.hideVideoPlayerTray = function () {
		YAHOO.util.Dom.setStyle("videoPlayerTray", "display", "none");
		
		var toggleShelfLinkEl = document.getElementById( "VideoDialog_toggleShelfLink" );
		toggleShelfLinkEl.innerHTML = "Video Shelf";
	}
	
	this.clearVideoPlayerTray = function () {	
		var vpt = document.getElementById("videoPlayerTray");
		vpt.innerHTML = '';
	}
	
	this.toggleVideoPlayerTray = function () {
		var tray = YAHOO.util.Dom.getStyle("videoPlayerTray", "display");
		if( tray == "block" )
			this.hideVideoPlayerTray();
		else
			this.displayVideoPlayerTray();
	}
	
	
	
	this.switchVideoPlayerContent = function ( id ) {
		
		this.buildVideoPlayerContent( this.DlgVideos[id].source, this.DlgPlayer );
	}
	
	this.buildVideoPlayerContent = function ( vSrc, vType ) {
		
		var vc = new SWFObject( vSrc, vSrc, this.DlgWidth, this.DlgHeight, "6", "#ffffff" );
		vc.addParam( "quality", "high" );
		vc.addParam( "menu", "false" );
		vc.addParam( "loop", "0" );
		vc.addParam( "wmode", "opaque" );
		
		// insert into document
		vc.write( "videoPlayerContent" );
		
		/*
		var vc =  '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="' + this.DlgWidth + '" height="' + this.DlgHeight + '" ID="PDLvideos">'+
			  '<param name="movie" value="'+vSrc+'">'+
			  '<param name="quality" value="high">'+
			  '<param name="menu" value="false">'+
			  '<param name="loop" value="0">'+
				'<param name="wmode" value="opaque">'+
			  '<embed src="'+vSrc+'" width="' + this.DlgWidth + '" height="' + this.DlgHeight + '" loop="0" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" menu="false" wmode="opaque" menu="false"></embed>'+
			'</object>';
			
		var vpc = document.getElementById("videoPlayerContent");
		vpc.innerHTML = vc;
		*/
	}
	
	this.clearVideoPlayerContent = function () {
		var vpc = document.getElementById("videoPlayerContent");
		vpc.innerHTML='';
	}
	
	this.addVideoGroup = function( groupName ) {
		
		if( this.videoGroups[ groupName ] == undefined ) {
		
			this.videoGroups[ groupName ] = [];
			
		}
		
	}
	
	this.removeVideoGroup = function( groupName ) {
		
		this.videoGroups[ groupName ] = null;
		
	}
	
	/**
	 * Adds a video to the specified group and returns the index for that video
	 * 
	 * @param {Object} video	Video object that defines path to and type of video
	 * @param {Object} groupName	Group name that the video will be assigned to
	 */
	
	this.addVideoToGroup = function( video, groupName ) {
		
		var group = this.videoGroups[ groupName ];
		
		if( group != undefined ) {
			
			var groupLength = group.length;
			group[ groupLength ] = video;
			return groupLength;
			
		}
		
	}
	
	this.openVideoGroup = function( groupName, videoIndex ) {
	
		var dlgHelpTutorial = PDL.widget.VideoDialog;
		var params = { videoplayer : "flash", width : 625, height : 480, zindex : 360 };
			
		params.videosources = this.videoGroups[ groupName ];
		params.index = videoIndex;
		
		this.loadVideo( params );
		
	}
	
	this.openVideo = function( videoIndex ) {
		
		
		
	}
	
}	