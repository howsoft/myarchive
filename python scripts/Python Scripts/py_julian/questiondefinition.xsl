
<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">


  	<xsl:param name="qnumber" />

	<xsl:variable name="pqnumber">
		<xsl:if test="10 > $qnumber">0<xsl:value-of select="$qnumber"/></xsl:if>
		<xsl:if test="$qnumber > 9"><xsl:value-of select="$qnumber"/></xsl:if>
	</xsl:variable>

<xsl:template match="/">

<questiondefinition>
	<sourcetree><xsl:value-of select="//eclipse_root"/></sourcetree>
	<package><xsl:value-of select="//project"/>.<xsl:value-of select="//subproject"/>.question<xsl:value-of select="$pqnumber"/></package>
</questiondefinition>

</xsl:template>

</xsl:stylesheet>