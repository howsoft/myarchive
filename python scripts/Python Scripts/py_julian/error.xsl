<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">



<xsl:template name="error">
		<xsl:param name="errorcode" />

		<xsl:choose>
			<xsl:when test="$errorcode = 1">
			<t>
			************ ERROR ************<break/>
			A "dropcode" character style cannot<break/>
			be contained within a "dragbox" <break/>
			paragraph style<break/>
			************ ERROR ************<break/>
			</t>
			</xsl:when>
			<xsl:when test="$errorcode = 2">
			<t>
			************ ERROR ************<break/>
			A "dragtarget" character style cannot<break/>
			be contained within a "dropbox" <break/>
			paragraph style<break/>
			************ ERROR ************<break/>
			</t>
			</xsl:when>
		</xsl:choose>
</xsl:template>


</xsl:stylesheet>