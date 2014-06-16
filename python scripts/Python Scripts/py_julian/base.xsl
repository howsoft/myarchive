<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
version="1.0"
xmlns:func="http://exslt.org/functions"
xmlns:om="http://myown.org">


<xsl:template match="*">
		<xsl:copy> 
			 <xsl:copy-of select="@*" />
			 <xsl:apply-templates/>
		</xsl:copy> 
</xsl:template>


</xsl:stylesheet>