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

<xsl:template match="section[@level=2][./heading='Datasets:']" mode="copy"/>
<xsl:template match="section[@level=2][./heading='Comment']" mode="copy"/>


<xsl:template match="inline[@kind='splaceholder']" mode="copy">
	<xsl:variable name="placeholdernumber" select="number(.)"/>	
	<xsl:apply-templates select="//section[@level='2'][position() = 3]/table/row" mode="splaceholder">
		<xsl:with-param name="placeholdernumber" select="$placeholdernumber"/>
	</xsl:apply-templates>
</xsl:template>

<xsl:template match="row" mode="splaceholder">
	<xsl:param name="placeholdernumber"/>
	<xsl:variable name="key" select="cell[1]"/>
	<!-- for some strange reason this comparison cannot be a contains; get a arrayoutofbounds 7 >= 4 god knows what this means--> 	
	<xsl:if test="om:trim($datasetkey)=om:trim($key)">
			xxxxxxxxxxxxxxx<xsl:apply-templates select="cell[$placeholdernumber + 1]" mode="copy"/>yyyyyyyyyyyyyyyyy
	</xsl:if>
</xsl:template>


<xsl:template match="*" mode="copy">
		<xsl:copy> 
			 <xsl:copy-of select="@*" />
			 <xsl:apply-templates mode="copy"/>
		</xsl:copy> 
</xsl:template>

</xsl:stylesheet>