<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0"
xmlns:func="http://exslt.org/functions"
xmlns:om="http://myown.org">

<xsl:param name="question" />
<xsl:param name="javaclass" />

	<xsl:include href="common.xsl" />
	<xsl:include href="error.xsl"/>
	
	<xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz</xsl:variable>
	<xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
	
	<xsl:variable name="datasetkey" select="om:getparam('datasetkey')"/>
	
		<!--<xsl:variable name="qalphanumber" select="$question"/>-->

		<!--where there are multiple datasets strip off the abcde...etc.-->
		<xsl:variable name="nodatasets">
			<xsl:choose>
			<xsl:when test="string-length($question) = 3"><xsl:value-of select="substring($question,1,2)"/></xsl:when>
			<xsl:otherwise><xsl:value-of select="$question"/></xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:variable name="questiontype">
			<xsl:apply-templates mode="getquestiontype" select="//section[@level='1']"/>
		</xsl:variable>

		<xsl:variable name="qnumber">
		<xsl:choose>
				<xsl:when test="contains($question,'20')">20</xsl:when>
				<xsl:when test="contains($question,'19')">19</xsl:when>
				<xsl:when test="contains($question,'18')">18</xsl:when>
				<xsl:when test="contains($question,'17')">17</xsl:when>
				<xsl:when test="contains($question,'16')">16</xsl:when>
				<xsl:when test="contains($question,'15')">15</xsl:when>
				<xsl:when test="contains($question,'14')">14</xsl:when>
				<xsl:when test="contains($question,'13')">13</xsl:when>
				<xsl:when test="contains($question,'12')">12</xsl:when>
				<xsl:when test="contains($question,'11')">11</xsl:when>
				<xsl:when test="contains($question,'10')">10</xsl:when>
				<xsl:when test="contains($question,'9')">9</xsl:when>
				<xsl:when test="contains($question,'8')">8</xsl:when>
				<xsl:when test="contains($question,'7')">7</xsl:when>
				<xsl:when test="contains($question,'6')">6</xsl:when>
				<xsl:when test="contains($question,'5')">5</xsl:when>
				<xsl:when test="contains($question,'4')">4</xsl:when>
				<xsl:when test="contains($question,'3')">3</xsl:when>
				<xsl:when test="contains($question,'2')">2</xsl:when>
				<xsl:when test="contains($question,'1')">1</xsl:when>
		</xsl:choose>
		</xsl:variable>

	<!--<xsl:variable name="suffixno">
		<xsl:choose>
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
		</xsl:choose>
	</xsl:variable>-->
	
	<xsl:variable name="javaclassov">
		<xsl:choose>
			<xsl:when test="//controller/questions/question[@number = $qnumber]/javaclass != ''">
				<xsl:value-of select="//controller/questions/question[@number = $qnumber]/javaclass"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$javaclass"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

<xsl:template match="//document"/>

<xsl:template match="//controller">
		<xsl:apply-templates select="questions/question[@number = number($nodatasets)]"/>
</xsl:template>

<xsl:template match="questions/question">

  <xsl:variable name="paddedquestion">
	<xsl:choose>
		<xsl:when test="10 > $question">0<xsl:value-of select="$question"/></xsl:when>
		<xsl:otherwise><xsl:value-of select="$question"/></xsl:otherwise>
	</xsl:choose>
  </xsl:variable>

  package <xsl:value-of select="//controller/package_prefix" />.question<xsl:value-of select="$paddedquestion"/>;
  

  import om.*;
  import om.helper.SimpleQuestion1;
  import java.util.Random;
  import java.util.HashMap;
  import java.util.Map;
  import java.util.Iterator;

  public class <xsl:value-of select="$javaclassov"/> extends SimpleQuestion1 {
		<xsl:choose>
			<xsl:when test="count(//controller/returnIncorrect) > 0">
				<xsl:apply-templates select="//controller/returnIncorrect" mode="returnIncorrect"/>
			</xsl:when>
			<xsl:otherwise>
  protected boolean returnIncorrect[] = {false,false,false,false};
			</xsl:otherwise>
		</xsl:choose>
  protected int feedbackTypes[] = {<xsl:value-of select="om:getparam('feedbackTypes','1,2')"/>};
<!--
		<xsl:choose>
			<xsl:when test="optiontotal">
	 //some of the drop boxes may be distractors and are meant to remain empty
	 //in this case optiontotal is set to the number of correct answers required
	 //this is set in controller.xml
  protected int optiontotal = <xsl:value-of  select="optiontotal"/>;
			</xsl:when>

			<xsl:otherwise>
  protected int optiontotal = -1;
			</xsl:otherwise>
		</xsl:choose>
-->
  protected String questiontype = "<xsl:value-of select="$questiontype"/>";
<xsl:apply-templates select="//section[@level='1']"/>

  private int iVariant;
  
  private Random r;
  
  <![CDATA[private Map<String,String> mPlaceholders=new HashMap<String,String>();]]>

  protected void init() throws OmException
  {
		r = getRandom();
		<xsl:apply-templates select="//section[@level='1']" mode="plh"/>
  }
  
  <xsl:call-template name="Datasetcontrolcode" />

</xsl:template>

<xsl:template match="section[@level='1'][heading[@level='1']]" mode="plh">
		<xsl:if test="substring-after(heading,' ') = $qnumber">
			<!--<xsl:apply-templates select="section[@level='2'][heading[@level='2']/.='Datasets' or heading[@level='2']/.='datasets']" mode="plh"/>-->
			<xsl:apply-templates select="section[@level='2'][heading[@level='2']/.='Datasets' or heading[@level='2']/.='datasets']" mode="plh"/>

			</xsl:if>
</xsl:template>

<xsl:template match="section[@level='2'][heading[@level='2']/.='Datasets' or heading[@level='2']/.='datasets']" mode="plh">
	<xsl:apply-templates select="Dataset" mode="plh"/> 
</xsl:template>

<xsl:template match="Dataset" mode="plh">
		iVariant = r.nextInt(<xsl:value-of select="count(table[position()=1]/row) - 1"/>);
		<xsl:variable name="datatype" select="translate(@datatype, $ucletters, $lcletters)"/>
		<xsl:choose>
			<xsl:when test="contains($datatype,'simpleinclusiverow')">
				<xsl:apply-templates select="table/row[position()=1]/cell" mode="sir"/>
			</xsl:when>
			<xsl:when test="contains($datatype,'simplemultipleinclusiverow')">
				<xsl:apply-templates select="table[position() = 1]/row[position()=1]/cell" mode="smir"/>
			</xsl:when>
			<xsl:when test="contains($datatype,'simplemultipleexclusiverow')">
				<xsl:apply-templates select="table[position() = 1]/row[position()=1]/cell" mode="smer"/>
			</xsl:when>
		</xsl:choose>
</xsl:template>

<xsl:template match="*" mode="plh"/>

<xsl:template match="cell" mode="sir">
		<xsl:variable name="node"><xsl:apply-templates select="par/."/></xsl:variable>
		<xsl:variable name="plhname" select="translate($node, $ucletters, $lcletters)"/>
		setPlaceholders("plh_<xsl:value-of select="$plhname"/>",plh_<xsl:value-of select="$plhname"/>[iVariant]);</xsl:template>
		
<xsl:template match="cell" mode="smir">
		<xsl:variable name="stringnodes"><xsl:apply-templates select="parent::row/cell/par/."/></xsl:variable>
		<xsl:variable name="node"><xsl:apply-templates select="par/."/></xsl:variable>
		<xsl:variable name="varname" select="translate($stringnodes, $ucletters, $lcletters)"/>
		<xsl:variable name="plhname" select="translate($node, $ucletters, $lcletters)"/>
		plh_<xsl:value-of select="$varname"/> = processPlaceholder("plh_<xsl:value-of select="$plhname"/>",plh_<xsl:value-of select="$varname"/>);</xsl:template>

<xsl:template match="cell" mode="smer">
		<xsl:variable name="stringnodes"><xsl:apply-templates select="parent::row/cell/par/."/></xsl:variable>
		<xsl:variable name="node"><xsl:apply-templates select="par/."/></xsl:variable>
		<xsl:variable name="varname" select="translate($stringnodes, $ucletters, $lcletters)"/>
		<xsl:variable name="plhname" select="translate($node, $ucletters, $lcletters)"/>
		plh_<xsl:value-of select="$varname"/> = processPlaceholderEx("plh_<xsl:value-of select="$plhname"/>",plh_<xsl:value-of select="$varname"/>);</xsl:template>

		
<xsl:template match="section[@level='1']">
			<xsl:apply-templates select="section[@level='2'][position()=1]" mode="thisquestion"/>
</xsl:template>


<xsl:template match="section[@level='2'][position()='1']" mode="thisquestion">
<xsl:variable name="options" select="om:getOptions()"/>
<xsl:variable name="checktotal" select="om:getChecktotal()"/>
  protected int options = <xsl:value-of select="$options"/>;

  protected int checktotal = <xsl:value-of select="$checktotal"/>;
</xsl:template>

<xsl:template match="returnIncorrect" mode="returnIncorrect">
  <!--the trailing false is never used just there for syntax-->protected boolean returnIncorrect[] = {<xsl:apply-templates select="attempt" mode="returnIncorrect"/>false};
</xsl:template>

<xsl:template match="section[@level='2'][heading[@level='2']/.='Datasets' or heading[@level='2']/.='datasets']">
<xsl:apply-templates select="Dataset"/> 
</xsl:template>

<xsl:template match="Dataset">

  private String[]
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="1"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="2"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="3"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="4"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="5"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="6"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="7"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="8"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="9"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="10"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="11"/></xsl:call-template>
  <xsl:call-template name="arrayrow"><xsl:with-param name="position" select="12"/></xsl:call-template>
</xsl:template>

<xsl:template name="arrayrow">
 <xsl:param name="position"/>
  <xsl:variable name="colspan">
    <xsl:choose>
		<xsl:when test="table/row[position()=2]/cell/@colspan != ''"><xsl:value-of select="table/row[position()=2]/cell/@colspan"/></xsl:when>
		<xsl:otherwise>1</xsl:otherwise>
	</xsl:choose>
  </xsl:variable>
 

 <xsl:variable name="maxvariables" select="count(table/row[position()=1]/cell)"/>
 <xsl:variable name="datatype" select="translate(@datatype, $ucletters, $lcletters)"/>
  <xsl:choose>
	<xsl:when test="$datatype = 'simpleinclusiverow'">
		<xsl:call-template name="simpleinclusiverow">
			<xsl:with-param name="position" select="$position"/>
			<xsl:with-param name="maxvariables" select="$maxvariables"/>
		</xsl:call-template>
	</xsl:when>
	<xsl:when test="$datatype = 'simplemultipleinclusiverow'">
		<xsl:call-template name="simplemultipleinclusiverow">
			<xsl:with-param name="position" select="$position"/>
			<xsl:with-param name="maxvariables" select="$maxvariables"/>
		</xsl:call-template>
	</xsl:when>
	<xsl:when test="$datatype = 'simplemultipleexclusiverow'">
		<xsl:call-template name="simplemultipleinclusiverow">
			<xsl:with-param name="position" select="$position"/>
			<xsl:with-param name="maxvariables" select="$maxvariables"/>
		</xsl:call-template>
	</xsl:when>
	<xsl:otherwise>
		[[[[unknown datatype = <xsl:value-of select="@datatype"/>]]]]
	</xsl:otherwise>
 </xsl:choose>
</xsl:template>

<xsl:template name="simplemultipleinclusiverow">
	<xsl:param name="position" />
	<xsl:param name="maxvariables" />
	<xsl:variable name="hassuffix">
		<xsl:choose>
		<xsl:when test="count(table) = 1">no</xsl:when>
		<xsl:when test="count(table) > 1">yes</xsl:when>
		</xsl:choose>
	</xsl:variable>
<xsl:if test="$position = 1">
  		 <xsl:apply-templates select="table" mode="multiname">
			<xsl:with-param name="position" select="$position"/>
			<xsl:with-param name="hassuffix" select="$hassuffix"/>
		 </xsl:apply-templates>
		 <xsl:if test="count(table) > 1">
  private String[][]  		 
  <xsl:apply-templates select="table[position()=1]/row[position()=1]" mode="multiname">
			<xsl:with-param name="position" select="''"/>
		 </xsl:apply-templates>
		 <xsl:apply-templates select="table" mode="member"/>
			
		 </xsl:if>
</xsl:if> 
</xsl:template>

<xsl:template name="simpleinclusiverow">
	<xsl:param name="position" />
	<xsl:param name="maxvariables" />
  		 <xsl:apply-templates select="table/row[position()=1]/cell[position()=$position]" mode="name"/>
		 <xsl:apply-templates select="table/row[position()>1]/cell[position()=$position]"/>
		 <xsl:apply-templates select="table/row[position()=1]/cell[position()=$position]" mode="last"/>
		  <xsl:choose>
	<xsl:when test="$position = $maxvariables">;
  </xsl:when>
  	<xsl:when test="$position > $maxvariables"></xsl:when>
	<xsl:otherwise>,
  </xsl:otherwise>
 </xsl:choose>
</xsl:template>

<xsl:template match="table" mode="multiname">
	<xsl:param name="position"/>
	<xsl:param name="hassuffix"/>
	<xsl:variable name="suffix">
		<xsl:choose>
			<xsl:when test="$hassuffix = 'no'"></xsl:when>
			<xsl:otherwise><xsl:value-of select="position()"/></xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
  		 <xsl:apply-templates select="row[position()=1]" mode="multiname">
			<xsl:with-param name="position" select="$suffix"/>
		 </xsl:apply-templates>
		 <xsl:apply-templates select="row[position()>1]/cell[position()=1]"/>
		 <xsl:apply-templates select="row[position()=1]/cell[position()=1]" mode="last"/>
		 <xsl:choose>
			<xsl:when test="position()=last()">;</xsl:when>
			<xsl:otherwise>,
  </xsl:otherwise>
		 </xsl:choose>
</xsl:template>

<xsl:template match="table" mode="member">
	<xsl:param name="position"/>
  		 <xsl:apply-templates select="row[position()=1]" mode="member">
			<xsl:with-param name="position" select="position()"/>
		 </xsl:apply-templates>
		 <xsl:choose>
			<xsl:when test="position()=last()">};</xsl:when>
			<xsl:otherwise>,</xsl:otherwise>
		 </xsl:choose>
</xsl:template>

<xsl:template match="row" mode="member">
		<xsl:param name="position"/>
		<xsl:variable name="stringnodes"><xsl:apply-templates select="cell/par/."/></xsl:variable>
<xsl:variable name="varname" select="translate($stringnodes, $ucletters, $lcletters)"/>plh<xsl:value-of select="$position"/>_<xsl:value-of select="$varname"/></xsl:template>


<xsl:template match="row" mode="multiname">
		<xsl:param name="position"/>
		<xsl:variable name="stringnodes"><xsl:apply-templates select="cell/par/."/></xsl:variable>
		<xsl:variable name="varname" select="translate($stringnodes, $ucletters, $lcletters)"/>plh<xsl:value-of select="$position"/>_<xsl:value-of select="$varname"/> = {</xsl:template>

<xsl:template match="table/row/cell" mode="name">
		<xsl:variable name="node"><xsl:apply-templates select="par/."/></xsl:variable>
		<xsl:variable name="plhname" select="translate($node, $ucletters, $lcletters)"/>plh_<xsl:value-of select="$plhname"/> = {</xsl:template>
<xsl:template match="table/row/cell">"<xsl:apply-templates select="par"/>",</xsl:template>
<xsl:template match="table/row/cell" mode="last">""}</xsl:template>
<xsl:template match="table/row/cell" mode="lastrow">;
  </xsl:template>
  
<xsl:template match="table/row/cell" mode="nameassign">plh_<xsl:apply-templates select="par"/> = </xsl:template>  

<xsl:template match="attempt" mode="returnIncorrect"><xsl:value-of select="concat(.,',')"/></xsl:template>

<xsl:template match="inline[@kind='subscript']">_<xsl:apply-templates/></xsl:template>

<xsl:template name="Datasetcontrolcode">

  protected void setPlaceholders(String sPlaceholder,String sValue)
  {
		//I need access to the Placeholders hashmap defined in StandardQuestion but
		//it is private and so I have to reproduce its functionality here. Pity.
		
		sValue = sValue.replaceAll("&lt;","&lt;");
		sValue = sValue.replace("&gt;","&gt;");
		setPlaceholder(sPlaceholder,sValue);
		mPlaceholders.put(sPlaceholder,sValue);
  }
  
  protected String getTextPlh(String sID) throws OmDeveloperException
  {
		//this wrapper function alters the behaviour in the standard getText function
		//which does not apply the placeholders (pity), to a function that does.
		String txt = getText(sID).getText();
		Iterator iterator = mPlaceholders.keySet().iterator();
		while( iterator.hasNext() ){
			String plh = iterator.next().toString();
			txt = txt.replace("__" + plh + "__",mPlaceholders.get(plh));
		}
		return txt;
  }

  protected String[] removeElement(int element,String[] array) throws OmException
  {
		String[] b = new String[array.length-1];
		System.arraycopy( array, 0, b, 0, element );
		System.arraycopy( array, element+1, b, element, b.length-element );
		return b;
  }
	
  protected String[] processPlaceholder(String plh, String[] array) throws OmException
  {
		setPlaceholders(plh,array[iVariant]);
		array = removeElement(iVariant,array);
		iVariant = r.nextInt(array.length -1);
		return array;
  }
	
  protected String[][] processPlaceholder(String plh, String[][] arrays) throws OmException
  {
		String[] array = {""};
				
		for (int i = 0;arrays.length > i;i++){
			setPlaceholders(plh + (i + 1),arrays[i][iVariant]);
			array = removeElement(iVariant,arrays[i]);
			arrays[i] = array;
		}

		if (array.length > 1){
			iVariant = r.nextInt(array.length - 1);
		}
		return arrays;
  }
  
  protected String[][] processPlaceholderEx(String plh, String[][] arrays) throws OmException
  {
		String[] array = {""};
				
		for (int i = 0;arrays.length > i;i++){
			setPlaceholders(plh + (i + 1),arrays[i][iVariant]);
			for (int j = 0;arrays.length > j;j++){
				array = removeElement(iVariant,arrays[j]);
				arrays[j] = array;
			}
			if (array.length > 1){
				iVariant = r.nextInt(array.length - 1);
			}
		}


		return arrays;
  }
	
</xsl:template>

<xsl:template match="newline">&lt;break/&gt;</xsl:template>

<xsl:template match="inline[@kind='subscript']">_<xsl:apply-templates/></xsl:template>
<xsl:template match="inline[@kind='SBcSubscript']">_<xsl:apply-templates/></xsl:template>

</xsl:stylesheet>