<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
version="1.0"
xmlns:func="http://exslt.org/functions"
xmlns:om="http://myown.org">

<xsl:param name="qnumber"/>

<xsl:include href="common.xsl" />
<xsl:include href="util.xsl" />

<xsl:variable name="datasetkey" select="om:getparam('datasetkey')"/>
 

<xsl:template match="/">
	<xsl:choose>
		<xsl:when test="1=2"/>
		<xsl:otherwise>
			<xsl:apply-templates select="//document"/>
		</xsl:otherwise>	
	</xsl:choose>
</xsl:template>

<xsl:template match="document">
		<xsl:copy> 
			 <xsl:copy-of select="@*" />
			 <xsl:apply-templates mode="copy"/>
		</xsl:copy> 
</xsl:template>

<xsl:template match="part" mode="copy">
	<xsl:apply-templates mode="copy"/>
</xsl:template>

<!-- clear out unwanted elements -->
<xsl:template match="section[@level=2][./heading='Datasets:']" mode="copy"/>
<xsl:template match="section[@level=2][position()=3]" mode="copy"/>
<xsl:template match="section[@level=2][./heading='Comment']" mode="copy"/>
<xsl:template match="documentinfo" mode="copy"/>
<xsl:template match="pagefooter" mode="copy"/>
<xsl:template match="heading" mode="copy"/>
<!--<xsl:template match="part" mode="copy"><apply-templates mode="copy"/></xsl:template>-->

<xsl:template match="section[@level='2'][count(preceding::section[@level='2'])=0]" mode="copy">
		<xsl:copy> 
			 <xsl:copy-of select="@*" />
				<xsl:apply-templates select="table/row" mode="inixq">
					<xsl:with-param name="questiontype" select="$questiontype"/>
				</xsl:apply-templates>
		</xsl:copy> 
</xsl:template>

<!-- ***********************************************************************MAIN MANIFOLD************************************************************-->
<xsl:template match="row" mode="inixq">
	<xsl:param name="questiontype"/>
	<!--<xsl:apply-templates select="cell[position() = 2]"/>-->
	<xsl:variable name="tag" select="cell[position()=1]"/>
	
	<xsl:choose>
		<xsl:when test="contains($tag,'Qs LOG')"></xsl:when>
		<xsl:when test="contains($tag,'Qs name')"></xsl:when>
		<xsl:when test="contains($tag,'Qs Name')"></xsl:when>
		
		<xsl:when test="contains($tag,'Options')">
			<xsl:if test="$questiontype='DD'"><xsl:apply-templates select="cell[position() = 2]" mode="copy"/><break/><break/></xsl:if>
		</xsl:when>
		
		<xsl:when test="contains($tag,'Reference')"></xsl:when>
		<xsl:when test="contains($tag,'Question name')"></xsl:when>
		<xsl:when test="contains($tag,'Question text')">
				<t id="questionline" display="no"><xsl:value-of select="substring(cell[position() = 2],0,255)"/></t>
				<xsl:apply-templates select="cell[position() = 2]" mode="copy"/><break/>
		</xsl:when>
		<!--put accessible first as key words are within the normal rubric-->
		<xsl:when test="contains($tag,'Official use only') and contains($tag,'Accessible Instruction text')">
				<if plain="yes"><xsl:apply-templates select="cell[position() = 2]"  mode="copy"/><break/></if>
		</xsl:when>
		<xsl:when test="contains($tag,'Official use only') and contains($tag,'Instruction text')">
				<if plain="no"><xsl:apply-templates select="cell[position() = 2]"  mode="copy"/><break/></if>
		</xsl:when>
		<xsl:when test="contains($tag,'Accessible question text') and contains($tag, 'only for questions with images')"></xsl:when>

		<xsl:when test="contains($tag,'Official use only')"></xsl:when>
		<xsl:when test="contains($tag,'Screen display')"><xsl:apply-templates select="cell[position() = 2]"  mode="copy"/><break/></xsl:when>
		<xsl:when test="contains($tag,'Copyright details')"></xsl:when>
		<xsl:when test="contains($tag,'Image file name')">
			<xsl:if test="om:trim(cell[position() = 2]) != '.jpg' and cell[position() = 2] != ''">
				<xsl:apply-templates select="cell[position() = 2]"  mode="copy"/><break/><break/>
			</xsl:if>
		</xsl:when>
		<xsl:when test="contains($tag,'Accessible alternative text')"></xsl:when>
		<xsl:when test="contains($tag,'Accessible alternative Qs text')"></xsl:when>
		<xsl:when test="contains($tag,'Accessible alternative question text')"></xsl:when>
		 	
		<xsl:otherwise>
		<xsl:apply-templates select="cell"  mode="copy"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template match="inline[@kind='splaceholder']" mode="copy">
	<xsl:variable name="placeholdernumber" select="om:getPlaceholderNumber()"/>	
	<xsl:apply-templates select="//section[@level='2'][position() = 3]/table/row" mode="splaceholder">
		<xsl:with-param name="placeholdernumber" select="$placeholdernumber"/>
	</xsl:apply-templates>
</xsl:template>

<xsl:template match="row" mode="splaceholder">
	<xsl:param name="placeholdernumber"/>
	<xsl:variable name="key" select="cell[1]/par/."/>
	<!-- for some strange reason this comparison cannot be a contains; get a arrayoutofbounds 7 >= 4 god knows what this means--> 	
	<!--[[[<xsl:value-of select="$key"/>][<xsl:value-of select="string-length($key)"/>]]]-->
	<xsl:if test="om:trim(om:getparam('datasetkey'))=om:trim($key)">
			<xsl:apply-templates select="cell[$placeholdernumber + 1]" mode="placeholdervalue"/>
	</xsl:if>
</xsl:template>

<xsl:template match="cell" mode="placeholdervalue">
	<xsl:apply-templates select="par[@kind='command']" mode="bypass"/>
	<xsl:choose>
	<xsl:when test="count(par[@kind = 'dragbox']) > 0"><xsl:apply-templates mode="copy"/></xsl:when>
	<xsl:when test="count(par) > 0"><xsl:apply-templates select="par" mode="skippar"/></xsl:when>
	<xsl:otherwise><xsl:apply-templates mode="copy"/></xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="par" mode="skippar">
	<xsl:apply-templates mode="copy"/>
</xsl:template>

<xsl:template match="inline[@kind='italic' or @kind='bold']" mode="copy">
	<xsl:choose>
		<xsl:when test="count(ancestor::par[@kind = 'dropbox']) > 0 or count(ancestor::par[@kind = 'dragbox'])">
			<xsl:apply-templates mode="copy"/></xsl:when>
		<xsl:when test="count(descendant::inline[@kind = 'dropcode']) > 0">
			<xsl:apply-templates mode="copy"/></xsl:when>
		<xsl:otherwise>
		<xsl:copy> 
			 <xsl:copy-of select="@*" />
			 <xsl:apply-templates mode="copy"/></xsl:copy> 
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="inline[@kind='textcolor' or @kind='fontsize']" mode="copy">
	<xsl:apply-templates mode="copy"/></xsl:template>

<xsl:template match="par[@kind='command']" mode="skippar"/>
	
<xsl:template match="par" mode="copy">
	<xsl:copy>
		<xsl:copy-of select="@*" />
		<xsl:apply-templates mode="copy"/>
	</xsl:copy>
</xsl:template>

<xsl:template match="cell" mode="copy">
	<xsl:copy>
		<xsl:copy-of select="@*" />
		<xsl:apply-templates mode="copy"/>
	</xsl:copy>
</xsl:template>


<xsl:template match="*" mode="copy">
	<xsl:copy>
		<xsl:copy-of select="@*" />
		<xsl:apply-templates mode="copy"/>
	</xsl:copy>
</xsl:template>

<xsl:template match="*" mode="bypass">
	<xsl:copy>
		<xsl:copy-of select="@*" />
		<xsl:apply-templates mode="copy"/>
	</xsl:copy>
</xsl:template>

</xsl:stylesheet>