<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:map="http://apache.org/cocoon/sitemap/1.0" version="1.0">
	<xsl:param name="eclipse_path"/>
	<xsl:param name="cocoon_path"/>
	<xsl:param name="tomcat_location"/>
	<xsl:param name="package_prefix"/>

	<xsl:include href="common.xsl"/>
	<xsl:include href="error.xsl"/>

<xsl:variable name="qnumber" select="''"/>
<xsl:variable name="qalphanumber" select="''"/>
<xsl:variable name="suffixno" select="''"/>

<xsl:variable name="datasetkey" select="//controller/datasetkey"/>

<xsl:template match="//script"/>
<xsl:template match="//controller">


<script  type="text/javascript">

var eclipse_path="<xsl:value-of select="$eclipse_path"/>";
var cocoon_path="<xsl:value-of select="$cocoon_path"/>";

</script>


<style>
table.imagesoff .imagerow
{
display:none;
}
table.imageson .imagerow
{
display:block;
}
</style>

<script language="javascript">

<xsl:value-of select="//script" disable-output-escaping="yes"/>

</script>


	<table><tr><td valign="top">

	<table id="questiontable" class="imagesoff">
			<!--<input id="buildsrc" type="text" style="width:650px" onchange="buildsrcchanged(this)" onkeydown="buildsrckeydown(this)"/>-->
			<td colspan="5" width="500px">
			<input type="button" value="Upcast" onclick="upcast()"/>
			<div style="display:none"><a href="script/pandora.htm">link</a></div>
			<input type="button" value="images" onclick="javascript:toggleimages()"/>
			</td>
			<xsl:apply-templates select="questions/question"/>
	</table>
	</td>
	</tr>
	</table>

</xsl:template>

<xsl:template match="//map:sitemap"/>

<xsl:template match="question">

	
	 	<xsl:call-template name="writerow">
			<xsl:with-param name="suffixno" select="''"/>
		</xsl:call-template>

</xsl:template>

<xsl:template name="writerow">
	<xsl:param name="suffixno"/>

	<xsl:variable name="pqnumber">
		<xsl:if test="10 > @number">0<xsl:value-of select="@number"/></xsl:if>
		<xsl:if test="@number > 9"><xsl:value-of select="@number"/></xsl:if>
	</xsl:variable>

	<xsl:variable name="questiontype">
				<xsl:apply-templates mode="getquestiontype" select="//section[@level='1']">
					<xsl:with-param name="qnumber" select="@number"/>
				</xsl:apply-templates>
	</xsl:variable>

	<xsl:variable name="javaclass">
				<xsl:choose>
					<xsl:when test="javaclass"><xsl:value-of select="javaclass"/></xsl:when>
					<xsl:when test="$questiontype = 'RA'">Q00</xsl:when>
					<xsl:when test="$questiontype = 'CH'">Q04</xsl:when>
					<xsl:when test="$questiontype = 'DD'">Q01</xsl:when>
					<xsl:when test="$questiontype = 'TX'">Q02</xsl:when>
					<xsl:otherwise>Q99</xsl:otherwise>
				</xsl:choose>
	</xsl:variable>

	<tr>

			<!--<td>
				<a href="file://{$eclipse_path}/question{$pqnumber}{$suffixno}">folder</a>
			</td> -->
			<td>
				<input type="button" onclick="javascript:copyclip(this)" value="question{concat($pqnumber,$suffixno)}"/>  
				<div style="display:none">
					<xsl:variable name="questionname" select="concat('question', @number)"/>
					<xsl:value-of select="//map:sitemap/map:pipelines/map:component-configurations/global-variables/child::node()[contains(local-name(),$questionname)]"/>
				</div>			
			</td>
			<td>[<xsl:value-of select="$questiontype"/>]</td>

			<td>
				<div style="display:none"><a href="question{$pqnumber}{$suffixno}/question.xml">question.xml</a></div>
				<input value="XML" type="button" onclick="javascript:showFile('question{$pqnumber}{$suffixno}/question.xml')"/>
			</td>

			<!--
			<td>
				<input type="button" value="build" onclick="javacript:getXML('question{$pqnumber}{$suffixno}/question.xml')" />
			</td>
			-->

			<td>
					<div style="display:none"><a href="question{$pqnumber}{$suffixno}/{$javaclass}.java"><xsl:value-of select="$javaclass"/>.java</a></div>
					<input value="Java" type="button" onclick="javascript:showFile('question{$pqnumber}{$suffixno}/{$javaclass}.java')" />
			</td>

			<!--
			<td>
				<input type="button" value="build" onclick="javacript:getText('question{$pqnumber}{$suffixno}/{$javaclass}.java')" />
			</td>
			-->

			<td>
				<xsl:variable name="buildpath" select="concat($tomcat_location,'build/',$package_prefix,'.question',$pqnumber,$suffixno,'/')"/>
    			<input id="question{concat($pqnumber,$suffixno)}buildpath" type="button" value="build" onclick="javacript:getBoth('question{$pqnumber}{$suffixno}/question.xml','question{$pqnumber}{$suffixno}/{$javaclass}.java','{$buildpath}')" />
			</td>
			<!--
			<td>
				<a href="{concat(//controller/tomcat_location,'build/',//controller/package_prefix,'.question',$pqnumber,$suffixno,'/')}">final build</a>
			</td>
			-->
			<td>
				<xsl:variable name="runpath" select="concat($tomcat_location,'run/',$package_prefix,'.question',$pqnumber,$suffixno,'/')"/>
				<!--<a href="{concat(//controller/tomcat_location,'run/',//controller/package_prefix,'.question',$pqnumber,$suffixno,'/')}">run</a>-->
				<input type="button" value="run" onclick="javacript:run('{$runpath}')"/>
			</td>
	</tr>
	<xsl:if test="$questiontype = 'CH' or $questiontype = 'RA'">
			<tr class="imagerow">
			<td>
				<img src="question{$pqnumber}{$suffixno}/btick.jpg" />
				<img src="question{$pqnumber}{$suffixno}/bcross.jpg" />
				<img src="question{$pqnumber}{$suffixno}/bholder.jpg" />
			</td>
			</tr>
	</xsl:if>
	<xsl:apply-templates mode="getimages" select="//section[@level='1']">
		<xsl:with-param name="qnumber" select="@number"/>
		<xsl:with-param name="pqnumber" select="$pqnumber"/>
		<xsl:with-param name="suffixno" select="$suffixno"/>
	</xsl:apply-templates>
</xsl:template>

<xsl:template match="//document"/>
<xsl:template match="target"/>

<xsl:template match="section[@level='1']" mode="getimages">
		<xsl:param name="qnumber"/>
		<xsl:param name="pqnumber"/>
		<xsl:param name="suffixno"/>

		<xsl:if test="substring-after(heading,' ') = $qnumber">
		<tr class="imagerow"><td colspan="7">

			<xsl:apply-templates select=".//par[@kind = 'image']" mode="getimages">
					<xsl:with-param name="qnumber" select="$qnumber"/>
					<xsl:with-param name="pqnumber" select="$pqnumber"/>
					<xsl:with-param name="suffixno" select="$suffixno"/>
			</xsl:apply-templates>
		</td></tr>
		</xsl:if>
</xsl:template>

<xsl:template match="par[@kind = 'image']"  mode="getimages">
		<xsl:param name="qnumber"/>
		<xsl:param name="pqnumber"/>
		<xsl:param name="suffixno"/>
		<xsl:variable name="imagename">
				<xsl:call-template name="replace-string">
		            <xsl:with-param name="text" select="text()"/>
					<xsl:with-param name="from" select="' '"/>
					<xsl:with-param name="to" select="''"/>
				</xsl:call-template>
		</xsl:variable>
		<img src="question{$pqnumber}{$suffixno}/{$imagename}" />
</xsl:template>



</xsl:stylesheet>