

<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0"
xmlns:func="http://exslt.org/functions"
xmlns:om="http://myown.org">

	<xsl:variable name="suffixno">
		<!--<xsl:choose>
				<xsl:when test="//controller/questions/question[@number = $qnumber]/dataset">
						<xsl:value-of select="//controller/questions/question[@number = $qnumber]/dataset"/>
				</xsl:when>
				<xsl:when test="contains($qalphanumber,'a')">1</xsl:when>
				<xsl:when test="contains($qalphanumber,'b')">2</xsl:when>
				<xsl:when test="contains($qalphanumber,'c')">3</xsl:when>
				<xsl:when test="contains($qalphanumber,'d')">4</xsl:when>
				<xsl:when test="contains($qalphanumber,'e')">5</xsl:when>
				<xsl:when test="contains($qalphanumber,'f')">6</xsl:when>
				<xsl:when test="contains($qalphanumber,'g')">7</xsl:when>
				<xsl:when test="contains($qalphanumber,'h')">8</xsl:when>
				<xsl:when test="contains($qalphanumber,'i')">9</xsl:when>
				<xsl:otherwise>1</xsl:otherwise>
		</xsl:choose>-->
	</xsl:variable>

	<xsl:variable name="suffixletter">
		<!--<xsl:choose>
				<xsl:when test="contains($qalphanumber,'a')">a</xsl:when>
				<xsl:when test="contains($qalphanumber,'b')">b</xsl:when>
				<xsl:when test="contains($qalphanumber,'c')">c</xsl:when>
				<xsl:when test="contains($qalphanumber,'d')">d</xsl:when>
				<xsl:when test="contains($qalphanumber,'e')">e</xsl:when>
				<xsl:when test="contains($qalphanumber,'f')">f</xsl:when>
				<xsl:when test="contains($qalphanumber,'g')">g</xsl:when>
				<xsl:when test="contains($qalphanumber,'h')">h</xsl:when>
				<xsl:when test="contains($qalphanumber,'i')">i</xsl:when>
				<xsl:otherwise></xsl:otherwise>
		</xsl:choose>-->
	</xsl:variable>
	
	

	<xsl:variable name="pqnumber">
		<xsl:if test="10 > $qnumber">0<xsl:value-of select="$qnumber"/></xsl:if>
		<xsl:if test="$qnumber > 9"><xsl:value-of select="$qnumber"/></xsl:if>
	</xsl:variable>

	<xsl:variable name="questiontype">
				<xsl:apply-templates mode="getquestiontype" select="//section[@level='1']">
					<!--<xsl:with-param name="qnumber" select="$qnumber"/>-->
				</xsl:apply-templates>
	</xsl:variable>

	<xsl:variable name="javaclass">
				<xsl:choose>
					<xsl:when test="//controller/questions/question[@number = $qnumber]/javaclass"><xsl:value-of select="//controller/questions/question[@number = $qnumber]/javaclass"/></xsl:when>
					<xsl:when test="$questiontype = 'RA'">Q00</xsl:when>
					<xsl:when test="$questiontype = 'CH'">Q04</xsl:when>
					<xsl:when test="$questiontype = 'DD'">Q01</xsl:when>
					<xsl:when test="$questiontype = 'TX'">Q02</xsl:when>
					<xsl:otherwise>Q99</xsl:otherwise>
				</xsl:choose>
	</xsl:variable>

    <xsl:variable name="package_prefix" select="//controller/package_prefix"/>
	<xsl:variable name="title" select="//controller/title"/>
	<xsl:variable name="marks" select="//controller/questions/question[@number = $qnumber]/marks"/>
	

<!-- these are templates used to match areas of the controller-->
<xsl:template match="match">
		<!-- in multi textedit questions this number will be too high but will not loop to infinity-->
		<t display="no" id="maxanswers"><xsl:value-of select="count(regularexpression[contains(@name,'answer')])"/></t>
		<!-- this number will also be too high but will not loop to infinity-->
		<t display="no" id="maxspecificfeedback"><xsl:value-of select="count(regularexpression[contains(@name,'feedback')])"/></t>
		<xsl:apply-templates select="regularexpression"/>
</xsl:template>

<xsl:template match="regularexpression">
		<t display="no" id="{@name}"><xsl:apply-templates/></t>
		<t display="no" id="{@name}_matchtype"><xsl:value-of select="@match"/></t>
		<xsl:if test="@match = 'group'">
			<t display="no" id="{@name}_noingroup"><xsl:value-of select="count(regularexpression)"/></t>
		</xsl:if>
</xsl:template>

<xsl:template match="ws">[ \t\n\f\r]*</xsl:template>
<xsl:template match="openround">[\u0028]</xsl:template>
<xsl:template match="closeround">[\u0029]</xsl:template>
<xsl:template match="multiply">[\u002a]</xsl:template>

<xsl:template match="row" mode="layout">
<row height="{@height}" />
</xsl:template>

<xsl:template match="column" mode="layout">
<column width="{@width}"/>
</xsl:template>

</xsl:stylesheet>