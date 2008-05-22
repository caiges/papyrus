YAHOO.widget.papyrus.pageEditorTests = new YAHOO.tool.TestCase( { 
  
     name: "Test Page Editor", 
       
     testPageEditorExistance : function () { 
         
		Assert.isNotNull( YAHOO.widget.papyrus.PageEditor );

     }, 	 
     
	testPageEditorRegistration : function () { 
          
     } 

} );

YAHOO.tool.TestRunner.add( YAHOO.widget.papyrus.pageEditorTests ); 