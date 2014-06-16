<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>


<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
version="1.0"
xmlns:func="http://exslt.org/functions"
xmlns:om="http://myown.org">



  	<xsl:param name="qnumber" />
	

	
	<xsl:variable name="datasetkey" select="om:getparam('datasetkey')"/>

	<xsl:include href="common.xsl" />
	<xsl:include href="error.xsl"/>
	<xsl:include href="util.xsl" />
	<!--<xsl:include href="parallel.xsl" />-->
	
	

  <!-- Show document info -->
  <xsl:template match="/">
			
		<question class="{$package_prefix}.question{$pqnumber}{$suffixletter}.{$javaclass}">
			<xsl:comment><xsl:value-of select="$qnumber"/></xsl:comment>
			<title><xsl:value-of select="concat($title,' Question ',$qnumber)"/> </title>
			<scoring><marks><xsl:value-of select="$marks"/></marks></scoring>
			<layout>
				<xsl:choose>
				<xsl:when test="//controller/questions/question[@number = $qnumber]/layout != ''">
				<xsl:apply-templates select="//controller/questions/question[@number = $qnumber]/layout/*" mode="layout"/>
				</xsl:when>
				<xsl:otherwise>
					<row height="0"/>
					<row height="0"/>
					<column width="592"/>
				</xsl:otherwise>
				</xsl:choose>
			</layout>

			<xsl:apply-templates select="//section[@level='1']"/>
		</question>

  </xsl:template>


<!-- remove all comments and section headera-->
<xsl:template match="section[@level='1'][heading[@level='1']/.='Comment' or heading[@level='1']/.='comment']"/>
<xsl:template match="section[@level='2'][heading[@level='2']/.='Comment' or heading[@level='2']/.='comment']"/>
<xsl:template match="section[@level='3'][heading[@level='3']/.='Comment' or heading[@level='3']/.='comment']"/>
<xsl:template match="section[@level='4'][heading[@level='4']/.='Comment' or heading[@level='4']/.='comment']"/>
<xsl:template match="section[@level='2'][heading[@level='2']/.='Datasets' or heading[@level='2']/.='datasets']"/>
<xsl:template match="heading[@level='1']"/>
<xsl:template match="heading[@level='2']"/>
<xsl:template match="heading[@level='3']"/>
<xsl:template match="heading[@level='4']"/>
<xsl:template match="annotation"/>
<xsl:template match="//controller"/>
<xsl:template match="hidden" />
<xsl:template match="pageheader"/>


<xsl:template match="section[@level='1'][heading[@level='1']]">
					<xsl:apply-templates />
</xsl:template>

<xsl:template match="section[@level='2'][1]">


<box gridx="0" gridy="0" id="inputbox" background="input">

			<xsl:variable name="questiontype" select="om:getQuestionType()"/>

			<xsl:if test="$questiontype = 'TX'">
				<xsl:apply-templates select="//controller/questions/question[@number = $qnumber]/match"/>
			</xsl:if>
			<xsl:if test="$questiontype = 'DD'">
				<t id="maxspecificfeedback" display="no"><xsl:value-of select="10"/></t>
			</xsl:if>

  <xsl:apply-templates/>
  <button action="actionSubmit" label="{//controller/actionSubmit}"/>
  <xsl:if test="//controller/actionRedo != ''">
	<button action="actionRedo" label="{//controller/actionRedo}"/>
  </xsl:if>
  <gap/>
</box>
<gap/>
</xsl:template>


<xsl:template match="section[@level='1'][heading[@level='1']/.='Comment' or heading[@level='1']/.='comment']"/>

<xsl:template match="par[@kind='command']">
<t id="{substring-before(text(),' ')}" display="no"><xsl:value-of select="substring-after(text(),' ')"/></t>
</xsl:template>

<xsl:template match="par[@kind='comment' or @kind='comment Char']">
<!--strip out-->
</xsl:template>
<xsl:template match="inline[@kind='comment' or @kind='comment Char']">
<!--strip out-->
</xsl:template>

<xsl:template match="par">
  <xsl:if test="@halign='center'"><xsl:text disable-output-escaping="yes">&lt;centre></xsl:text></xsl:if>
  <xsl:apply-templates />
  <xsl:if test="@halign='center'"><xsl:text disable-output-escaping="yes">&lt;/centre></xsl:text></xsl:if>
  <xsl:choose>
	  <xsl:when test="//inline[@kind='format']"/>
	  <xsl:when test="count(ancestor::table) = 0">
	  		<break/>
	  </xsl:when>
	  <xsl:when test="count(ancestor::table) = 1">
			<xsl:if test="count(ancestor::section[@level='1'][heading[@level = 1]/.='feedback' or heading[@level = 1]/.='Feedback']) = 1">
	  			<break/>
			</xsl:if>
	  </xsl:when>
  </xsl:choose>
  </xsl:template>


<!-- ****************************************************************** FEEDBACK **********************************************************-->
<!--<xsl:template match="section[@level='2'][heading[@level='2']/.='Feedback' or heading[@level='2']/.='feedback']">-->
<xsl:template match="section[@level='2'][2]">
<!-- write function for this-->
<xsl:variable name="gridx">
<xsl:choose>
	<xsl:when test="count(//controller/questions/question[@number = $qnumber]/layout/column)>1">1</xsl:when>
	<xsl:otherwise>0</xsl:otherwise>
</xsl:choose>
</xsl:variable>
<xsl:variable name="gridy">
<xsl:choose>
	<xsl:when test="count(//controller/questions/question[@number = $qnumber]/layout/column)>1">0</xsl:when>
	<xsl:otherwise>1</xsl:otherwise>
</xsl:choose>
</xsl:variable>

<box gridx="{$gridx}" gridy="{$gridy}" id="answerbox" display="no" background="answer">
    <t id="wrong">Your answer is <t id="still">still</t> incorrect.</t>

    <t id="right">Your answer is correct.</t>
    
    <t id="pass">You passed on this question.</t>

    <t id="rightwronggap"><gap/></t>
	<t id="autoFeedback1" display="no">
    </t>
    <t id="autoFeedback2" display="no">
    </t>
    <t id="autoFeedback3" display="no">
    </t>
	<t id="autoFeedbackGap" display="no">
	<gap/>
    </t>
	
	<!--***********************************************************-->
	
	<xsl:apply-templates select="descendant::table/row" mode="specificfeedback">
		<xsl:with-param name="location" select="'before'"/>
	</xsl:apply-templates>
	
    <t id="feedback">
		<xsl:apply-templates select="descendant::table/row[cell[1]//inline[contains(.,'Feedback 1 general comment (optional)')]]" mode="feedback">
			<xsl:with-param name="attemptnumber" select="1"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="descendant::table/row[cell[1]//inline[contains(.,'Feedback 2 general comment (optional)')]]" mode="feedback">
			<xsl:with-param name="attemptnumber" select="2"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="descendant::table/row[cell[1]//inline[contains(.,'Feedback 3 general comment (optional)')]]" mode="feedback">
			<xsl:with-param name="attemptnumber" select="3"/>
		</xsl:apply-templates>
    </t>

	<xsl:apply-templates select="descendant::table/row" mode="specificfeedback">
		<xsl:with-param name="location" select="'after'"/>
	</xsl:apply-templates>
	<!--***********************************************************-->
	
	<t id="correctanswer" display="no">
		<xsl:apply-templates select="table/row[contains(cell[1]//inline,'Correct answer')]/cell[2]"/>
    </t>

    <t id="answer">
		<!--translate(cell[1]//inline, $ucletters, $lcletters)-->
		<xsl:variable name="finalcomment" select="table/row[contains(translate(cell[1]//inline, $ucletters, $lcletters),'final comment') or contains(translate(cell[1]//par, $ucletters, $lcletters),'final answer')]/cell[2]"/>
		<xsl:if test="$finalcomment != '' and $finalcomment != ' '">
				<xsl:apply-templates select="table/row[contains(translate(cell[1]//inline, $ucletters, $lcletters),'final comment') or contains(translate(cell[1]//par, $ucletters, $lcletters),'final answer')]/cell[2]"/>
				<gap/>
		</xsl:if>
		
		<xsl:value-of select="om:getparam('refprefix')"/>
		<xsl:apply-templates select="table/row[contains(translate(cell[1]//inline, $ucletters, $lcletters),'reference') or contains(translate(cell[1]//par, $ucletters, $lcletters),'reference')]/cell[2]"/>
		
		<gap/>
    </t>

	<button id="ok" action="actionOK" label="%%lTRYAGAIN%%"/>
	<button id="next" action="actionOK" label="%%lNEXTQUESTION%%" display="no"/>
	<gap/>
</box>
</xsl:template>

<xsl:template match="row" mode="specificfeedback">
	<xsl:param name="location"/>
	<!-- this lot sorts out whether feedback is before or after the general comment-->
	<xsl:variable name="cellone">
		<xsl:apply-templates/>
	</xsl:variable>

	<xsl:choose>
	<xsl:when test="$location = 'before'">
		<xsl:apply-templates select="self::node()[contains(cell[1],'Feedback 1')][count(preceding-sibling::table/row/cell[.//inline[contains(.,'Feedback 1 general comment (optional)')]])=0]" mode="specificfeedbackrow">
			<xsl:with-param name="attemptnumber" select="1"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="self::node()[contains(cell[1],'Feedback 2')][count(preceding-sibling::table/row/cell[.//inline[contains(.,'Feedback 2 general comment (optional)')]])=0]" mode="specificfeedbackrow">
			<xsl:with-param name="attemptnumber" select="2"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="self::node()[contains(cell[1],'Feedback 3')][count(preceding-sibling::table/row/cell[.//inline[contains(.,'Feedback 3 general comment (optional)')]])=0]" mode="specificfeedbackrow">
			<xsl:with-param name="attemptnumber" select="3"/>
		</xsl:apply-templates>
	</xsl:when>
	<xsl:when test="$location = 'after'">
		<xsl:apply-templates select="self::node()[contains(cell[1],'Feedback 1')][count(preceding-sibling::table/row/cell[.//inline[contains(.,'Feedback 1 general comment (optional)')]])>0]" mode="specificfeedbackrow">
			<xsl:with-param name="attemptnumber" select="1"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="self::node()[contains(cell[1],'Feedback 2')][count(preceding-sibling::table/row/cell[.//inline[contains(.,'Feedback 2 general comment (optional)')]])>0]" mode="specificfeedbackrow">
			<xsl:with-param name="attemptnumber" select="2"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="self::node()[contains(cell[1],'Feedback 3')][count(preceding-sibling::table/row/cell[.//inline[contains(.,'Feedback 3 general comment (optional)')]])>0]" mode="specificfeedbackrow">
			<xsl:with-param name="attemptnumber" select="3"/>
		</xsl:apply-templates>
	</xsl:when>
	</xsl:choose>

</xsl:template>

<!-- clear the Question and Feedback tags -->
<xsl:template match="heading[@level='1']"/>

<xsl:template match="table">
<xsl:variable name="head" select="count(row[1][count(descendant::cell/par[@kind='columnhead'])>0])"/>
<xsl:variable name="leftflag" select="count(row[2][count(descendant::cell/par[@kind='columnhead'])>0])"/>
<xsl:variable name="rows" select="count(row)"/>
<xsl:variable name="cols" select="count(row[1]/cell)"/>


	<xsl:variable name="previoustablesa" select="count(preceding::section[@level='1']//table)"/>
	<xsl:variable name="previoustablesb" select="count(preceding::table)"/>
	<xsl:variable name="tableposition" select="$previoustablesb - $previoustablesa + 1"/>

<xsl:variable name="nestlevel">
	<!-- the count is always going to be a minimum of one in this contect as all content is within the table-->
	<xsl:value-of select="count(preceding::table) + count(ancestor::table)"/>
</xsl:variable>

<!--[[[<xsl:value-of select="$nestlevel"/>]]]-->

<xsl:variable name="tabletype">
<xsl:choose>
	<xsl:when test="$questiontype='CH'">
	<xsl:value-of select="om:getparam('tabletype','layoutgrid', $nestlevel)"/>
	</xsl:when>
	<xsl:otherwise>
	<xsl:value-of select="om:getparam('tabletype','table', $nestlevel)"/>
	</xsl:otherwise>
</xsl:choose>
</xsl:variable>

<xsl:variable name="left">
	<xsl:choose>
		<xsl:when test="$leftflag > 0">1</xsl:when>
		<xsl:otherwise>0</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:choose>
	<xsl:when test="$tabletype = 'table'">
		<table rows="{$rows}" cols="{$cols}" head="{$head}" left="{$left}"><xsl:apply-templates/></table>
	</xsl:when>
	<xsl:when test="$tabletype = 'layoutgrid'">
		<xsl:variable name="widths" select="om:getparam('layoutwidths','',$nestlevel)"/>
		<xsl:choose>
			<xsl:when test="$widths != ''">
				<layoutgrid cols="{$cols}" widths="{$widths}">
					<xsl:apply-templates mode="layoutgrid"/>
				</layoutgrid>
			</xsl:when>
			<xsl:otherwise>
				<layoutgrid cols="{$cols}">
					<xsl:apply-templates mode="layoutgrid"/>
				</layoutgrid>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:when>
</xsl:choose>
</xsl:template>

<xsl:template match="row" mode="layoutgrid">
<xsl:apply-templates mode="layoutgrid"/>
</xsl:template>

<xsl:template match="cell" mode="layoutgrid">
<t><xsl:apply-templates/></t>
</xsl:template>

<xsl:template match="row">
<row><xsl:apply-templates/></row>
</xsl:template>

<xsl:template match="cell">
	<xsl:variable name="content"><xsl:apply-templates/></xsl:variable>
	<xsl:choose>
	<xsl:when test="$content!=''">
		<t><xsl:apply-templates/></t>
	</xsl:when>
	<xsl:otherwise><t>&nbsp;</t></xsl:otherwise>
	</xsl:choose>

</xsl:template>



<xsl:template match="inline[@kind = 'dropcode']">
<!--if this template is matched you are in an dropbox inline type of dnd-->
	<xsl:variable name="imageWithIplace"  select="om:useIplace('dropbox')" />
	<xsl:variable name="id" select="om:getId(text(),'drop')"/>
	<xsl:variable name="group" select="om:getGroup(text())"/>
	
		<!--<xsl:call-template name="get_Group">
			<xsl:with-param name="text" select="text()" />
		</xsl:call-template>
	</xsl:variable>-->
			<xsl:choose>
				<xsl:when test="$id = -1">[[[[malformed dropcode "<xsl:value-of select="text()"/>"]]]</xsl:when>
				<xsl:when test="//controller/questions/question[@number = $qnumber]/droptype = 'dropdown'">
						<dropdown id="a{$id}" display="yes">
							<xsl:call-template name="getDropOptions"/>
				  		</dropdown>
				</xsl:when>
				<xsl:when test="$imageWithIplace = 0"><dropbox id="{$id}" group="{$group}" /></xsl:when>
			</xsl:choose>
</xsl:template>

<xsl:template match="par[@kind = 'dropbox' or @kind = 'dropbox Char']">
	<xsl:param name="mode" select="''"/>
	<xsl:variable name="error1" select="count(descendant::inline[@kind='droptarget'])"/>
	<xsl:if test="@halign='center'"><xsl:text disable-output-escaping="yes">&lt;centre></xsl:text></xsl:if>
	<xsl:choose>
		<xsl:when test="$error1 > 0">
			<xsl:call-template name="error">
				<xsl:with-param name="errorcode" select="1" />
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:variable name="id" select="om:getId(descendant::inline[@kind = 'dropcode'],'drop')"/>
			<xsl:variable name="group" select="om:getGroup(descendant::inline[@kind='dropcode'])"/>
				<!--<xsl:call-template name="get_Group">
					<xsl:with-param name="text" select="descendant::inline[@kind = 'dropcode']" />
				</xsl:call-template>
			</xsl:variable>-->
			<xsl:variable name="imageWithDropIplace" select="om:useIplace('dropbox')"/>
			<xsl:variable name="top" select="om:getIplaceParam('top',$id)"/>
			<xsl:variable name="left" select="om:getIplaceParam('left',$id)"/>
			<xsl:variable name="label"><xsl:apply-templates /></xsl:variable>
			<xsl:variable name="sidelabel">
				<xsl:choose>
					<xsl:when test="//controller/debug = 'true'">
						<xsl:value-of select="om:getIplaceParam('sidelabel',$id)"/>
					</xsl:when>
				</xsl:choose>
			</xsl:variable>
			<xsl:choose>
				<xsl:when test="$mode='iplace' and $imageWithDropIplace > 0">
		   			<iplace left="{$left}" top="{$top}" label="{$label}"><dropbox id="{$id}" group="{$group}" sidelabel="{$sidelabel}"/></iplace>
				</xsl:when>
				<xsl:when test="$mode='' and $imageWithDropIplace = 0">
					<dropbox id="{$id}" group="{$group}" />
				</xsl:when>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:if test="@halign='center'"><xsl:text disable-output-escaping="yes">&lt;/centre></xsl:text></xsl:if>
</xsl:template>


<xsl:template match="par[@kind = 'dragbox']">
	<xsl:param name="mode" select="''"/>
	<xsl:variable name="dragtarget" select="descendant::inline[@kind = 'dragtarget']"/>
	<xsl:variable name="error2" select="count(descendant::inline[@kind='dropcode'])"/>
	<xsl:choose>
		<xsl:when test="$error2 > 0">
			<xsl:call-template name="error">
				<xsl:with-param name="errorcode" select="2" />
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:variable name="id" select="om:getId($dragtarget,'drag')"/>
			<xsl:variable name="group" select="om:getGroup($dragtarget)"/>
			<xsl:variable name="useIplace" select="om:useIplace('dropbox')"/>
			<xsl:variable name="top" select="om:getIplaceParam('top',concat('d',$id))"/>
			<xsl:variable name="left" select="om:getIplaceParam('left',concat('d',$id))"/>
			<xsl:variable name="imageWithDragIplace" select="om:useIplace('dragbox')"/>
			<xsl:variable name="label">
					<xsl:apply-templates />
			</xsl:variable>

			<xsl:choose>
					<xsl:when test="//controller/questions/question[@number = $qnumber]/droptype = 'dropdown'"></xsl:when>
					<xsl:when test="$mode='iplace' and $imageWithDragIplace > 0">

							<iplace left="{$left}" top="{$top}" label="{$label}">
							<if plain="no">
								<dragbox id="{$id}" group="{$group}">
									<t id="drag{substring($id,2,1)}"><xsl:apply-templates/></t>
								</dragbox>
							</if>
							</iplace>

					</xsl:when>
	  				<xsl:when test="$mode='' and $imageWithDragIplace = '0'">
						<dragbox id="{$id}" group="{$group}">
						<t id="drag{substring($id,2,1)}">
							<!-- put a switch in here for equation editor -->
							<xsl:choose>
								<xsl:when test="om:getparam('useEquation') = 'true'">
									<eq textfont="yes">\mbox{<xsl:apply-templates/>}</eq>
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates/>
								</xsl:otherwise>
							</xsl:choose>
						</t>
						</dragbox>
					</xsl:when>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="inline[@kind = 'dragtarget']" />

<xsl:template match="inline[@kind = 'input' or @kind = 'input Char']">
	<xsl:variable name="previousinputsa" select="count(preceding::section[@level='1']//inline[@kind='input'])"/>
	<xsl:variable name="previousinputsb" select="count(preceding::inline[@kind='input'])"/>
	<!--<xsl:variable name="inputId" select="$previousinputsb - $previousinputsa + 1"/>-->
	<xsl:variable name="inputId" select="om:getInputId()"/>
	<!--[[[[<xsl:value-of select="$previousinputsa"/>]]]]
	[[[[<xsl:value-of select="$previousinputsb"/>]]]]
	[[[[<xsl:value-of select="$inputId"/>]]]]-->
	<!--<xsl:variable name="inputId" select="count(preceding::inline[@kind = 'input'][ancestor::section[@level='1'][count(preceding::section[@level='1'])=$qposition]])" />-->
	<xsl:choose>
		<xsl:when test="count(ancestor::par[@kind='inputlabel']) > 0" />
		<!-- note the order of the following when conditions must be maintained-->
		<xsl:when test="contains(.,'check-yes') or contains(.,'Check-yes')">
			<centre><checkbox id="box{$inputId}"></checkbox></centre>
	        <t id="boxans{$inputId}" display="no">yes</t>
		</xsl:when>
		<xsl:when test="contains(.,'check') or contains(.,'Check')">
			<centre><checkbox id="box{$inputId}"></checkbox></centre>
		</xsl:when>
		<xsl:when test="contains(.,'radio-yes') or contains(.,'Radio-yes')">
			<centre><radiobox id="box{$inputId}"></radiobox></centre>
	        <t id="boxans{$inputId}" display="no">yes</t>
		</xsl:when>
		<xsl:when test="contains(.,'radio') or contains(.,'Radio')">
			<centre><radiobox id="box{$inputId}"></radiobox></centre>
		</xsl:when>
		<xsl:when test="contains(.,'text') or contains(.,'Text')">
			<xsl:variable name="cols">
				<xsl:choose>
					<xsl:when test="count(//controller/questions/question[@number = $qnumber]/*[name()=concat('input',$inputId)]) > 0">
						<xsl:value-of select="//controller/questions/question[@number = $qnumber]/*[name()=concat('input',$inputId)]/@cols"/>
					</xsl:when>
					<xsl:otherwise>10</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<editfield id="input{$inputId}" cols="{$cols}" label=""/>
		</xsl:when>
	</xsl:choose>
</xsl:template>

<xsl:template match="inline[@kind = 'bold']">
	<xsl:variable name="content">
		<xsl:apply-templates/>
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="$content = ''"></xsl:when>
		<xsl:when test="count(descendant::inline[@kind='dropbox']) != 0">
				<xsl:apply-templates/>
		</xsl:when>
		<xsl:when test="count(descendant::inline[@kind='dropbox Char']) != 0">
				<xsl:apply-templates/>
		</xsl:when>
		<xsl:otherwise>
				<emphasis><xsl:apply-templates/></emphasis>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>
<xsl:template match="inline[@kind = 'italic']">
	<xsl:variable name="content">
		<xsl:apply-templates/>
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="$content = ''"></xsl:when>
		<xsl:when test="count(descendant::inline[@kind='dropbox']) != 0">
				<xsl:apply-templates/>
		</xsl:when>
		<xsl:when test="count(descendant::inline[@kind='dropbox Char']) != 0">
				<xsl:apply-templates/>
		</xsl:when>
		<xsl:otherwise>
				<emphasis type="italic"><xsl:apply-templates/></emphasis>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template match="inline[@kind = 'format']">
<xsl:choose>
<xsl:when test="contains(.,'Spaces')">
		<xsl:variable name="nodename" select="text()"/>
		<xsl:variable name="list" select="//controller/questions/question[@number = $qnumber]/*[name()=$nodename]"/>
		<xsl:call-template name="replace-string">
 				<xsl:with-param name="text" select="$list"/>
				<xsl:with-param name="from" select="'.'"/>
				<xsl:with-param name="to" select="'&#160;'"/>
		</xsl:call-template>
</xsl:when>
<xsl:when test="contains(.,'&lt;plainmode&gt;')"><xsl:text disable-output-escaping="yes"><![CDATA[<if plain="yes">]]></xsl:text></xsl:when>
<xsl:when test="contains(.,'&lt;/plainmode&gt;')"><xsl:text disable-output-escaping="yes"><![CDATA[</if>]]></xsl:text></xsl:when>
<xsl:when test="contains(.,'&lt;notplainmode&gt;')"><xsl:text disable-output-escaping="yes"><![CDATA[<if plain="no">]]></xsl:text></xsl:when>
<xsl:when test="contains(.,'&lt;/notplainmode&gt;')"><xsl:text disable-output-escaping="yes"><![CDATA[</if>]]></xsl:text></xsl:when>

<xsl:otherwise>
<xsl:value-of disable-output-escaping="yes" select="."/>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="inline[@kind = 'plainmode']">
<if plain="yes"><xsl:apply-templates/><break/></if>
</xsl:template>


<xsl:template match="inline[@kind = 'notplainmode']">
<if plain="no"><xsl:apply-templates/></if>
</xsl:template>

<xsl:template match="inline[@kind = 'bold']">
<emphasis><xsl:apply-templates/></emphasis>
</xsl:template>

<!--any empty paragraphs are gaps but not if they are in comments.....-->
<xsl:template match="par[.=''][@kind!='comment']">
<gap/>
</xsl:template>

<xsl:template match="par[@kind = 'image']">
<xsl:variable name="imagename">
		<xsl:call-template name="replace-string">
            <xsl:with-param name="text" select="text()"/>
			<xsl:with-param name="from" select="' '"/>
			<xsl:with-param name="to" select="''"/>
		</xsl:call-template>
</xsl:variable>
<xsl:variable name="imageWithDropIplace" select="om:useIplace('dropbox')"/>
<xsl:variable name="imageWithDragIplace" select="om:useIplace('dragbox')"/>
<xsl:variable name="withinRowDataset" select="count(ancestor::Dataset[@type='row'])"/>
<xsl:variable name="withinColumnDataset" select="count(ancestor::Dataset[@type='column'])"/>

<xsl:if test="$imageWithDragIplace > 0"><xsl:text disable-output-escaping="yes"><![CDATA[<if plain="no">]]></xsl:text></xsl:if>
<image filePath="{$imagename}" alt="" id="image1a">
	<xsl:if test="$imageWithDropIplace > 0">
		<xsl:choose>
			<xsl:otherwise>
					<xsl:apply-templates select="ancestor::section[@level='1']//par[@kind = 'dropbox' or @kind = 'dropbox Char']">
						<xsl:with-param name="mode" select="'iplace'"/>
					</xsl:apply-templates>
					<xsl:apply-templates select="ancestor::section[@level='1']//par[@kind = 'inputlabel' or @kind = 'inputlabel Char']">
						<xsl:with-param name="source" select="'image'"/>
					</xsl:apply-templates>
			</xsl:otherwise>

		</xsl:choose>
	</xsl:if>
	<xsl:if test="$imageWithDragIplace > 0">
		<xsl:choose>
			<xsl:when test="$withinRowDataset">
					<xsl:apply-templates select="ancestor::Dataset/table/row[position() = $suffixno]//par[@kind = 'dragbox' or @kind = 'dragbox Char']">
											<xsl:with-param name="mode" select="'iplace'"/>
					</xsl:apply-templates>
			</xsl:when>
			<xsl:when test="$withinColumnDataset">
					<xsl:apply-templates select="ancestor::Dataset/table/row/cell[position() = $suffixno]//par[@kind = 'dragbox' or @kind = 'dragbox Char']">
											<xsl:with-param name="mode" select="'iplace'"/>
					</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
					<xsl:apply-templates select="ancestor::section[@level='1']//par[@kind = 'dragbox' or @kind = 'dragbox Char']">
											<xsl:with-param name="mode" select="'iplace'"/>
					</xsl:apply-templates>
			</xsl:otherwise>

		</xsl:choose>

	</xsl:if>
</image>
<xsl:if test="$imageWithDragIplace > 0"><xsl:text disable-output-escaping="yes"><![CDATA[</if>]]></xsl:text>
<xsl:if test="$imageWithDragIplace > 0"><xsl:text disable-output-escaping="yes"><![CDATA[<if plain="yes">]]></xsl:text></xsl:if>
<image filePath="{$imagename}" alt="" id="image1b">
	<xsl:if test="$imageWithDropIplace > 0">
		<xsl:choose>
			<xsl:otherwise>
					<xsl:apply-templates select="ancestor::section[@level='1']//par[@kind = 'dropbox' or @kind = 'dropbox Char']">
						<xsl:with-param name="mode" select="'iplace'"/>
					</xsl:apply-templates>
					<xsl:apply-templates select="ancestor::section[@level='1']//par[@kind = 'inputlabel' or @kind = 'inputlabel Char']">
						<xsl:with-param name="source" select="'image'"/>
					</xsl:apply-templates>
			</xsl:otherwise>

		</xsl:choose>
	</xsl:if>
</image>
<xsl:if test="$imageWithDragIplace > 0"><xsl:text disable-output-escaping="yes"><![CDATA[</if>]]></xsl:text></xsl:if>
</xsl:if>
</xsl:template>

<xsl:template name="processDropBoxes">

</xsl:template>

<xsl:template match="row" mode="feedback">
		<xsl:param name="attemptnumber" />
		<xsl:apply-templates mode="feedback" select="cell[2]">
			<xsl:with-param name="attemptnumber" select="$attemptnumber"/>
		</xsl:apply-templates>
</xsl:template>

<xsl:template match="cell" mode="feedback">
	 <xsl:param name="attemptnumber" />
	 <xsl:variable name="content">
		<xsl:apply-templates select="*[@kind!='comment']"/>
	 </xsl:variable>
     <t id="attempt{$attemptnumber}">
		<xsl:apply-templates/>
		<!-- bit crude but only put the gap in if feedback is not empty or white space
		- write a better function in here -->
		<!--[[[[<xsl:value-of select="string-length($content)"/>]]]]-->
		<xsl:if test="$content != '' and $content != ' ' and $content != '  '">
		<gap/>
		</xsl:if>
	 </t>
</xsl:template>

<xsl:template match="row" mode="specificfeedbackrow">
		<xsl:param name="attemptnumber" />
		<xsl:variable name="attemptsubtype">
			<xsl:choose>
				<xsl:when test="substring-after(cell[1],'-') != ''">
					<xsl:value-of select="substring-after(cell[1],'-')"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="substring(substring-after(cell[1],$attemptnumber),1,1)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!--yyyyyyyyyyyy<xsl:value-of select="."/>yyyyyyyyyyyyy-->
		<xsl:apply-templates mode="specificfeedback" select="cell[2]">
			<xsl:with-param name="attemptnumber" select="$attemptnumber"/>
			<xsl:with-param name="attemptsubtype" select="$attemptsubtype"/>
		</xsl:apply-templates>
</xsl:template>

<xsl:template match="cell" mode="specificfeedback">
	 <xsl:param name="attemptnumber" />
	 <xsl:param name="attemptsubtype"/>

	<!--[[[<xsl:value-of select="$attemptsubtype"/>]]]-->

	<!-- crude clean up routine come back to this-->
	<xsl:variable name="cleanattemptsubtype">
		<xsl:choose>
			<xsl:when test="$attemptsubtype = 'A' or $attemptsubtype = 'a'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'B' or $attemptsubtype = 'b'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'C' or $attemptsubtype = 'c'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'D' or $attemptsubtype = 'd'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'E' or $attemptsubtype = 'e'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'F' or $attemptsubtype = 'f'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'G' or $attemptsubtype = 'g'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'H' or $attemptsubtype = 'h'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="$attemptsubtype = 'I' or $attemptsubtype = 'i'"><xsl:value-of select="$attemptsubtype"/></xsl:when>
			<xsl:when test="substring($attemptsubtype,1,1) = 'a'"><xsl:value-of select="substring($attemptsubtype,1,4)"/></xsl:when>
			<xsl:otherwise></xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="content">
			<xsl:apply-templates/>
	</xsl:variable>
	<xsl:if test="$content != '' and string-length($cleanattemptsubtype) > 0">
	     <t display="no" id="attempt{$attemptnumber}{$cleanattemptsubtype}">
			<xsl:apply-templates/>
			<gap/>
		 </t>
	</xsl:if>

</xsl:template>

<xsl:template match="par[@kind='inputlabel']">
	<xsl:param name="source" select="''"/>
	<xsl:variable name="inputId" select="om:getInputId()"/>

		<!--<xsl:variable name="inputId" select="count(preceding::inline[@kind = 'input']) + 1" />-->
		<xsl:variable name="inputtext">
				<xsl:value-of select="descendant::inline[@kind='input']"/>
		</xsl:variable>
		<xsl:variable name="useIplace">
			 	<xsl:value-of select="count(//controller/questions/question[@number = $qnumber]/iplace)" />
	    </xsl:variable>

<!--[[[<xsl:value-of select="$useIplace"/>][<xsl:value-of select="$qnumber"/>]]]-->
		<xsl:choose>
		<xsl:when test="$useIplace > 0 and $source='image'">
				<xsl:variable name="top">
					<xsl:choose>
						<xsl:when test="count(//controller/questions/question[@number = $qnumber]/iplace[@id = $inputId]) > 0">
							<xsl:value-of select="//controller/questions/question[@number = $qnumber]/iplace[@id = $inputId]/@top"/>
						</xsl:when>
						<xsl:otherwise>0</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:variable name="left">
					<xsl:choose>
						<xsl:when test="count(//controller/questions/question[@number = $qnumber]/iplace[@id = $inputId]) > 0">
							<xsl:value-of select="//controller/questions/question[@number = $qnumber]/iplace[@id = $inputId]/@left"/>
						</xsl:when>
						<xsl:otherwise>0</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:variable name="label">
						<xsl:apply-templates />
				</xsl:variable>
   				<iplace left="{$left}" top="{$top}" label="{$label}">
					<xsl:call-template name="inputtype">
						<xsl:with-param name="inputId" select="$inputId"/>
						<xsl:with-param name="inputtext" select="$inputtext"/>
					</xsl:call-template>
				</iplace>
		</xsl:when>
		<xsl:when test="$useIplace = 0 and $source=''">
		<xsl:call-template name="inputtype">
			<xsl:with-param name="inputId" select="$inputId"/>
			<xsl:with-param name="inputtext" select="$inputtext"/>
		</xsl:call-template>
		</xsl:when>
		</xsl:choose>

</xsl:template>

<xsl:template name="inputtype">
		<xsl:param name="inputId"/>
		<xsl:param name="inputtext"/>
		
		<xsl:choose>
			<xsl:when test="contains(translate($inputtext,$ucletters, $lcletters),'radio-yes')">
				<radiobox id="box{$inputId}"><t><xsl:apply-templates/></t><t id="boxans{$inputId}" display="no">yes</t></radiobox>
			</xsl:when>
			<xsl:when test="contains(translate($inputtext,$ucletters, $lcletters),'radio')">
				<radiobox id="box{$inputId}"><t><xsl:apply-templates/></t></radiobox>
			</xsl:when>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="contains(translate($inputtext,$ucletters, $lcletters),'check-yes')">
				<checkbox id="box{$inputId}"><t>
				<xsl:choose>
					<xsl:when test="om:getparam('useEquation')='true'">
						<eq textfont="yes">\mbox{<xsl:apply-templates/>}</eq>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates/>
					</xsl:otherwise>
				</xsl:choose>
				</t><t id="boxans{$inputId}" display="no">yes</t></checkbox>
			</xsl:when>
			<xsl:when test="contains(translate($inputtext,$ucletters, $lcletters),'check')">
				<checkbox id="box{$inputId}"><t>
				<xsl:choose>
					<xsl:when test="om:getparam('useEquation')='true'">
						<eq textfont="yes">\mbox{<xsl:apply-templates/>}</eq>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates/>
					</xsl:otherwise>
				</xsl:choose>
				</t></checkbox>
			</xsl:when>
		</xsl:choose>
</xsl:template>



<xsl:template match="par[@kind = 'tick']">

	<xsl:variable name="positiona" select="count(preceding::section[@level='1']//par[@kind = 'tick'])"/>
	<xsl:variable name="positionb" select="count(preceding::par[@kind = 'tick'])"/>
	<xsl:variable name="position" select="$positionb - $positiona + 1"/>

	<xsl:choose>
	<xsl:when test="$questiontype = 'RA' or $questiontype = 'CH'">
	<t id="no{$position}" display="no" ><image filePath="bcross.jpg" alt="wrong answer" id="wrong{$position}" width="10"/></t>
	<t id="yes{$position}" display="no" ><image filePath="btick.jpg" alt="right answer" id="right{$position}" width="10"/></t>
	<t id="hold{$position}" display="yes" ><image filePath="bholder.jpg" alt="" id="holder{$position}" width="10"/></t>
	</xsl:when>
	<xsl:otherwise>
	<t id="no{$position}" display="no" ><image filePath="cross.jpg" alt="wrong answer" id="wrong{$position}" width="10"/></t>
	<t id="yes{$position}" display="no" ><image filePath="tick.jpg" alt="right answer" id="right{$position}" width="10"/></t>
	<t id="hold{$position}" display="yes" ><image filePath="holder.jpg" alt="" id="holder{$position}" width="10"/></t>
	</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template match="getdataset">
	<xsl:variable name="name" select="@name"/>
	<xsl:apply-templates select="ancestor::section[@level='1']//Datasets[@name=$name]"/>
</xsl:template>

<xsl:template match="Datasets">
	<xsl:apply-templates select="Dataset[position()=$suffixno]"/>
</xsl:template>

<xsl:template match="Dataset">
	<xsl:apply-templates/>
</xsl:template>

<xsl:template match="inline[@kind='placeholder']">
		<xsl:variable name="node"><xsl:apply-templates/></xsl:variable>
		<xsl:variable name="plhname" select="translate($node, $ucletters, $lcletters)"/>__plh_<xsl:value-of select="$plhname"/>__</xsl:template>


<xsl:template match="inline[@kind='eqplaceholder']">
		<xsl:variable name="node"><xsl:apply-templates/></xsl:variable>
		<xsl:variable name="plhname" select="translate($node, $ucletters, $lcletters)"/><eq>__plh_<xsl:value-of select="$plhname"/>__</eq></xsl:template>

<xsl:template match="inline[@kind='equation']">
		<xsl:variable name="node"><xsl:apply-templates/></xsl:variable>
		<eq textfont="yes">\mbox{<xsl:value-of select="$node"/>}</eq></xsl:template>

<xsl:template match="par[@kind='equation para']">
		<xsl:variable name="node"><xsl:apply-templates/></xsl:variable>
		<equation alt="" textfont="yes">\mbox{<xsl:value-of select="$node"/>}</equation></xsl:template>
		
<xsl:template match="par[@kind='eq para']">
		<xsl:variable name="node"><xsl:apply-templates/></xsl:variable>
		<eq textfont="yes">\mbox{<xsl:value-of select="$node"/>}</eq></xsl:template>
		
<xsl:template match="inline[@kind='subscript']">_<xsl:apply-templates/></xsl:template>
<xsl:template match="inline[@kind='SBcSubscript']">_<xsl:apply-templates/></xsl:template>
<xsl:template match="inline[@kind='superscript']">^<xsl:apply-templates/></xsl:template>

<xsl:template match="Dataset[@datatype]"  />


<!-- pass through lower level formating-->
<xsl:template match="t">
	<xsl:copy>
		<xsl:copy-of select="@*" />
		<xsl:apply-templates/>
	</xsl:copy>
</xsl:template>

<xsl:template match="break">
	<xsl:copy>
		<xsl:copy-of select="@*" />
		<xsl:apply-templates/>
	</xsl:copy>
</xsl:template>

<xsl:template match="if">
	<xsl:copy>
		<xsl:copy-of select="@*" />
		<xsl:apply-templates/>
	</xsl:copy>
</xsl:template>

</xsl:stylesheet>