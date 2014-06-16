

<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0"
xmlns:func="http://exslt.org/functions"
xmlns:om="http://myown.org">

<xsl:template match="par" mode="parallel">
	<xsl:value-of select="."/>
[P<xsl:apply-templates mode="parallel"/>P]
</xsl:template>

<xsl:template match="inline[@kind='textcolor']" mode="parallel">
[T<xsl:apply-templates mode="parallel"/>T]
</xsl:template>

<xsl:template match="inline[@kind='inputlabel']" mode="parallel">
[IL<xsl:apply-templates mode="parallel"/>IL]
</xsl:template>

<xsl:template match="inline[@kind='input']" mode="parallel">
zzzzzzzzzzzzzzzzzz
</xsl:template>



</xsl:stylesheet>