

<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&#160;">
<!ENTITY Uuml "&#220;">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0"
xmlns:func="http://exslt.org/functions"
xmlns:om="http://myown.org">

  <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz</xsl:variable>
  <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>

<xsl:template match="newline">
<!-- the space is necessary to prevent additional carriage return-->
&#160;<break/>
</xsl:template>

  <!-- Repeat the string 'str' 'cnt' times -->
  <xsl:template name="repeat-string">
    <xsl:param name="str"/><!-- The string to repeat -->
    <xsl:param name="cnt"/><!-- The number of times to repeat the string -->
    <xsl:param name="pfx"/><!-- The prefix to add to the string -->
    <xsl:choose>
      <xsl:when test="$cnt = 0">
        <xsl:value-of select="$pfx"/>
      </xsl:when>
      <xsl:when test="$cnt mod 2 = 1">
        <xsl:call-template name="repeat-string">
  	  <xsl:with-param name="str" select="concat($str,$str)"/>
  	  <xsl:with-param name="cnt" select="($cnt - 1) div 2"/>
  	  <xsl:with-param name="pfx" select="concat($pfx,$str)"/>
  	</xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
  	<xsl:call-template name="repeat-string">
  	  <xsl:with-param name="str" select="concat($str,$str)"/>
  	  <xsl:with-param name="cnt" select="$cnt div 2"/>
  	  <xsl:with-param name="pfx" select="$pfx"/>
  	</xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
    <xsl:template name="tokenize">
    <xsl:param name="str"/><!-- The string to process -->
    <xsl:param name="sep"/><!-- String containing legal token separators -->

    <xsl:variable name="rss">
      <xsl:call-template name="repeat-string">
        <xsl:with-param name="str" select="':'"/>
        <xsl:with-param name="cnt" select="string-length($sep)"/>
      </xsl:call-template>
    </xsl:variable>
  
    <xsl:call-template name="tokenize-1">
      <xsl:with-param name="pat" select="translate($str,$sep,$rss)"/>
    </xsl:call-template>
  </xsl:template>
  
  <xsl:template name="tokenize-1">
    <xsl:param name="pat"/><!-- String with record separators inserted -->
    <xsl:choose>
      <xsl:when test="contains($pat,':')">
        <xsl:call-template name="process-token">
  	<xsl:with-param name="token" select="substring-before($pat,':')"/>
        </xsl:call-template>
        <xsl:call-template name="tokenize-1">
  	<xsl:with-param name="pat" select="substring-after($pat,':')"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="process-token">
  	<xsl:with-param name="token" select="$pat"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="process-token">
    <xsl:param name="token"/>
    <option>
      <xsl:value-of select="$token"/>
    </option>
  </xsl:template>

  <!-- The recursive replace string stuff goes here-->
  <!-- Replace characters in a string -->
  <xsl:template name="replace-string">
    <xsl:param name="text"/>
    <xsl:param name="from"/>
    <xsl:param name="to"/>
    
    <xsl:choose>

      <xsl:when test="contains($text, $from)">

      	<xsl:variable name="before" select="substring-before($text, $from)"/>
      	<xsl:variable name="after" select="substring-after($text, $from)"/>
      	<xsl:variable name="prefix" select="concat($before, $to)"/>

      	<xsl:value-of select="$before"/>
      	<xsl:value-of select="$to"/>

          <xsl:call-template name="replace-string">
        	  <xsl:with-param name="text" select="$after"/>
        	  <xsl:with-param name="from" select="$from"/>
        	  <xsl:with-param name="to" select="$to"/>
        	</xsl:call-template>

      </xsl:when>

      <xsl:otherwise>
        <xsl:value-of select="$text"/>
      </xsl:otherwise>

    </xsl:choose>

  </xsl:template>
  <!-- End of replace characters in a string -->
 

  <xsl:template name="replace-string-nodeset">
    <xsl:param name="from1" select="'a'"/>
    <xsl:param name="to1" select="'a'"/>
    <xsl:param name="from2" select="'b'"/>
    <xsl:param name="to2" select="'b'"/>
    <xsl:param name="from3" select="'c'"/>
    <xsl:param name="to3" select="'c'"/>



		      <xsl:for-each select="child::node()" >
		          <xsl:variable name="mynodetest" select="self::*"/>

		           <xsl:choose>
		                    <xsl:when test="local-name()='newline'"><br /></xsl:when>
		                    <xsl:when test="string-length($mynodetest)=0 and $from3!=$to3">
             						  <xsl:call-template name="replace-string">
                                       <xsl:with-param name="text">
                                        <xsl:call-template name="replace-string">
                                            <xsl:with-param name="text">
                                                			<xsl:call-template name="replace-string">
                                                                  <xsl:with-param name="text">
                                                                              <!--globally remove emspaces-->
                                                                              <xsl:call-template name="replace-string">
                                                                                  <xsl:with-param name="text">
                                                                                      <xsl:value-of select="self::text()" />
                                                                                  </xsl:with-param>
                                                                                  <xsl:with-param name="from" select=" ' '"/>
                                                                                  <xsl:with-param name="to"   select="'&nbsp;&nbsp;&nbsp;'"/>
                                                                              </xsl:call-template>
                                                                  </xsl:with-param>
                                                                  <xsl:with-param name="from" select="$from1"/>
                                                                  <xsl:with-param name="to"   select="$to1"/>
                                                              </xsl:call-template>
                                            </xsl:with-param >
                                            <xsl:with-param name="from" select="$from2"/>
                                            <xsl:with-param name="to"   select="$to2"/>
                                        </xsl:call-template>
                                      </xsl:with-param >
                                      <xsl:with-param name="from" select="$from3"/>
                                      <xsl:with-param name="to"   select="$to3"/>
                                    </xsl:call-template>
		                    </xsl:when>
		                    <xsl:when test="string-length($mynodetest)=0 and $from2!=$to2">
                                        <xsl:call-template name="replace-string">
                                            <xsl:with-param name="text">
                                                			<xsl:call-template name="replace-string">
                                                                  <xsl:with-param name="text">
                                                                              <!--globally remove emspaces-->
                                                                              <xsl:call-template name="replace-string">
                                                                                  <xsl:with-param name="text">
                                                                                      <xsl:value-of select="self::text()" />
                                                                                  </xsl:with-param>
                                                                                  <xsl:with-param name="from" select=" ' '"/>
                                                                                  <xsl:with-param name="to"   select="'&nbsp;&nbsp;&nbsp;'"/>
                                                                              </xsl:call-template>
                                                                  </xsl:with-param>
                                                                  <xsl:with-param name="from" select="$from1"/>
                                                                  <xsl:with-param name="to"   select="$to1"/>
                                                              </xsl:call-template>
                                            </xsl:with-param >
                                            <xsl:with-param name="from" select="$from2"/>
                                            <xsl:with-param name="to"   select="$to2"/>
                                        </xsl:call-template>

		                    </xsl:when>
	                        <xsl:when test="string-length($mynodetest)=0 and $from1!=$to1">
                                                			<xsl:call-template name="replace-string">
                                                                  <xsl:with-param name="text">
                                                                              <!--globally remove emspaces-->
                                                                              <xsl:call-template name="replace-string">
                                                                                  <xsl:with-param name="text">
                                                                                      <xsl:value-of select="self::text()" />
                                                                                  </xsl:with-param>
                                                                                  <xsl:with-param name="from" select=" ' '"/>
                                                                                  <xsl:with-param name="to"   select="'&nbsp;&nbsp;&nbsp;'"/>
                                                                              </xsl:call-template>
                                                                  </xsl:with-param>
                                                                  <xsl:with-param name="from" select="$from1"/>
                                                                  <xsl:with-param name="to"   select="$to1"/>
                                                              </xsl:call-template>
		                    </xsl:when>
                            <xsl:when test="string-length($mynodetest)=0">
                                                                              <!--globally remove emspaces-->
                                                                              <xsl:call-template name="replace-string">
                                                                                  <xsl:with-param name="text">
                                                                                      <xsl:value-of select="self::text()" />
                                                                                  </xsl:with-param>
                                                                                  <xsl:with-param name="from" select=" ' '"/>
                                                                                  <xsl:with-param name="to"   select="'&nbsp;&nbsp;&nbsp;'"/>
                                                                              </xsl:call-template>
                            </xsl:when>
                            <xsl:otherwise>
                                      <xsl:apply-templates select="." mode="r3sn">
                                        <xsl:with-param name="from1" select="$from1" />
                                        <xsl:with-param name="to1" select="$to1"/>
                                        <xsl:with-param name="from2" select="$from2"/>
                                        <xsl:with-param name="to2" select="$to2"/>
                                        <xsl:with-param name="from3" select="$from3"/>
                                        <xsl:with-param name="to3" select="$to3"/>
                                      </xsl:apply-templates>
                            </xsl:otherwise>
                      </xsl:choose>
		      </xsl:for-each>
		      
</xsl:template>

<xsl:template match="inline[@kind='SoftHyphen']" mode="r3sn">&#173;</xsl:template>


<xsl:template match="inline" mode="r3sn">
    <xsl:param name="from1"/>
    <xsl:param name="to1"/>
    <xsl:param name="from2"/>
    <xsl:param name="to2"/>
    <xsl:param name="from3"/>
    <xsl:param name="to3"/>

    <xsl:variable name="class" select="@kind" />
    <xsl:choose>
					<xsl:when test="$class = 'CMcComment'"></xsl:when>
					<xsl:when test="$class = 'IAcInsertAsset'">
								<xsl:apply-templates select="." />
					</xsl:when>
					<xsl:otherwise>

						    <span class="{$class}">
    					    			<xsl:if test="$class='NGpNormalGerman' or $class = 'GLcGermanLang'" >
									<xsl:attribute name="lang">de</xsl:attribute>
								</xsl:if>	
						          <xsl:call-template name="replace-string-nodeset">
						                                        <xsl:with-param name="from1" select="$from1" />
						                                        <xsl:with-param name="to1" select="$to1"/>
						                                        <xsl:with-param name="from2" select="$from2"/>
						                                        <xsl:with-param name="to2" select="$to2"/>
						                                        <xsl:with-param name="from3" select="$from3"/>
						                                        <xsl:with-param name="to3" select="$to3"/>
						                                        </xsl:call-template></span>
                          </xsl:otherwise>   
   </xsl:choose>
</xsl:template>

<xsl:template match="par" mode="r3sn">
    <xsl:param name="from1"/>
    <xsl:param name="to1"/>
    <xsl:param name="from2"/>
    <xsl:param name="to2"/>
    <xsl:param name="from3"/>
    <xsl:param name="to3"/>

    <xsl:variable name="class" select="@kind" />
    <xsl:if test="$class != 'CMcComment'">
    <p class="{$class}">
    			<xsl:if test="$class='NGpNormalGerman' or $class='GLcGermanLang'" >
    			<xsl:attribute name="lang">de</xsl:attribute>
    			</xsl:if>
    								<xsl:call-template name="replace-string-nodeset">
                                        <xsl:with-param name="from1" select="$from1" />
                                        <xsl:with-param name="to1" select="$to1"/>
                                        <xsl:with-param name="from2" select="$from2"/>
                                        <xsl:with-param name="to2" select="$to2"/>
                                        <xsl:with-param name="from3" select="$from3"/>
                                        <xsl:with-param name="to3" select="$to3"/>
                                        </xsl:call-template></p>
    </xsl:if>
</xsl:template>

<xsl:template match="list/item" mode="r3sn">
    <xsl:param name="from1"/>
    <xsl:param name="to1"/>
    <xsl:param name="from2"/>
    <xsl:param name="to2"/>
    <xsl:param name="from3"/>
    <xsl:param name="to3"/>

    <xsl:if test="position() = 2">
      <xsl:text disable-output-escaping="yes">
        <![CDATA[<ul>]]>
      </xsl:text>
    </xsl:if>

		   <li>
           <xsl:call-template name="replace-string-nodeset">
                                        <xsl:with-param name="from1" select="$from1" />
                                        <xsl:with-param name="to1" select="$to1"/>
                                        <xsl:with-param name="from2" select="$from2"/>
                                        <xsl:with-param name="to2" select="$to2"/>
                                        <xsl:with-param name="from3" select="$from3"/>
                                        <xsl:with-param name="to3" select="$to3"/>
           </xsl:call-template>
           </li>

    <xsl:if test="position() = last() - 1">
      <xsl:text disable-output-escaping="yes">
        <![CDATA[</ul>]]>
      </xsl:text>
    </xsl:if>

</xsl:template>

<xsl:template match="newline" mode="r3sn">
<br />
</xsl:template>

<xsl:template match="inline[@kind='textcolor'][@value=6]" mode="r3sn">

    <xsl:call-template name="replace-string-nodeset">

    <xsl:with-param name="from1" select="' '"/>

    <xsl:with-param name="to1" select="'&nbsp;'"/>

    </xsl:call-template>

  </xsl:template>

<xsl:template match="inline[@kind='E4cElement4']" mode="r3sn">
<span class="E4cElement4">
<xsl:value-of select="."/>
</span>

  </xsl:template>

<func:function name="om:getGroup">
    <xsl:param name="text"/>
      	<xsl:variable name="lowerc" select="translate($text, $ucletters, $lcletters)"/>
		<xsl:variable name="trim" select="om:trim($lowerc)"/>
		<xsl:variable name="next" select="substring-after($trim, ' ')"/>
		<xsl:variable name="cleaned">
			<xsl:call-template name="replace-string">
				<xsl:with-param name="text" select="$next"/>
				<xsl:with-param name="from" select="' '"/>
				<xsl:with-param name="to" select="''"/>
			</xsl:call-template>
		</xsl:variable>
		<func:result select="$cleaned"/>
</func:function>
  <!-- Get drop id-->
  <xsl:template name="get_Group">
    <xsl:param name="text"/>
      	<xsl:variable name="lowerc" select="translate($text, $ucletters, $lcletters)"/>
		<xsl:variable name="trim" select="om:trim($lowerc)"/>
		<xsl:variable name="next" select="substring-after($trim, ' ')"/>
		<xsl:variable name="cleaned">
			<xsl:call-template name="replace-string">
				<xsl:with-param name="text" select="$next"/>
				<xsl:with-param name="from" select="' '"/>
				<xsl:with-param name="to" select="''"/>
			</xsl:call-template>
		</xsl:variable>
      	<xsl:value-of select="$cleaned"/>
  </xsl:template>

<xsl:template match="section[@level='1']" mode="getquestiontype">
		<xsl:param name="qnumber"/>

		<xsl:if test="position() = $qnumber or $qnumber = ''">
		<xsl:choose>
			<!--Drag and Drop-->
			<xsl:when test="count(.//par[@kind = 'dropbox' or @kind = 'dropbox Char']) > 0">DD</xsl:when>
			<!--Drag and Drop embedded in text-->
			<xsl:when test="count(.//inline[@kind = 'dropcode' or @kind = 'dropcode Char']) > 0">DD</xsl:when>
			<!--Checkboxes-->
			<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'check-yes') or contains(.,'Check-yes')]) > 0">CH</xsl:when>
			<!--Radio Buttons-->
			<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'radio-yes') or contains(.,'Radio-yes')]) > 0">RA</xsl:when>
			<!--Radio Buttons-->
			<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'Text') or contains(.,'text')]) > 0">TX</xsl:when>
		</xsl:choose>
		</xsl:if>
</xsl:template>


<func:function name="om:getQuestionType">

		<xsl:variable name="result">
		<xsl:choose>
			<!--Drag and Drop-->
			<xsl:when test="count(//par[@kind = 'dropbox' or @kind = 'dropbox Char']) > 0">DD</xsl:when>
			<!--Drag and Drop embedded in text-->
			<xsl:when test="count(//inline[@kind = 'dropcode' or @kind = 'dropcode Char']) > 0">DD</xsl:when>
			<!--Checkboxes-->
			<xsl:when test="count(//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'check-yes') or contains(.,'Check-yes')]) > 0">CH</xsl:when>
			<!--Radio Buttons-->
			<xsl:when test="count(//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'radio-yes') or contains(.,'Radio-yes')]) > 0">RA</xsl:when>
			<!--Radio Buttons-->
			<xsl:when test="count(//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'Text') or contains(.,'text')]) > 0">TX</xsl:when>
		</xsl:choose>
		</xsl:variable>
		<func:result select="$result"/>

</func:function>

<func:function name="om:getPlaceholderNumber">
	<xsl:variable name="placeholdernumber">
		<xsl:call-template name="replace-string-nodeset">
			<xsl:with-param name="from1" select="'['"/>
			<xsl:with-param name="to1" select="''"/>
			<xsl:with-param name="from2" select="']'"/>
			<xsl:with-param name="to2" select="''"/>
			<xsl:with-param name="from3" select="' '"/>
			<xsl:with-param name="to3" select="''"/>
		</xsl:call-template>
	</xsl:variable>
	<func:result select="$placeholdernumber"/>
</func:function>

<func:function name="om:getInputId">

		<xsl:variable name="withinRowDataset" select="count(ancestor::Dataset[@type='row'])"/>
		<xsl:variable name="withinColumnDataset" select="count(ancestor::Dataset[@type='column'])"/>
		<xsl:variable name="questioncount" select="count(preceding::section[@level='1'])"/>
		<xsl:variable name="datasetcount" select="count(preceding::row/cell/table)"/>

		<xsl:choose>
			<xsl:when test="$datasetkey !=''">
				<func:result select="count(preceding::inline[@kind = 'input'][count(preceding::row/cell/table)=$datasetcount]) + 1" />
				<!--<func:result select="$rowcount" />-->
			</xsl:when>
		<!--<xsl:when test="$withinRowDataset">
			<xsl:variable name="previouscount" select="count(preceding::row[parent::table[parent::Dataset[@type='row']]])"/>
 			<func:result select="count(preceding::inline[@kind = 'input'][count(preceding::row[parent::table[parent::Dataset[@type='row']]])=$previouscount]) + 1" />
		</xsl:when>
		<xsl:when test="$withinColumnDataset">
			<xsl:variable name="previouscount" select="count(preceding::cell[parent::row[parent::table[parent::Dataset[@type='column']]]])"/>
 			<func:result select="count(preceding::inline[@kind = 'input'][count(preceding::cell[parent::row[parent::table[parent::Dataset[@type='column']]]])=$previouscount]) + 1" />
		</xsl:when>-->
			<xsl:otherwise>
				<func:result select="count(preceding::inline[@kind = 'input'][count(preceding::section[@level='1'])=$questioncount]) + 1" />
			</xsl:otherwise>
		</xsl:choose>
</func:function>

 <func:function name="om:getparam">
        <xsl:param name="paramname"/>
		<xsl:param name="default"/>
		<xsl:param name="position" select="''"/>
		<xsl:variable name="localvar">
			<xsl:choose>
					<xsl:when test="//controller/questions/question[@number = $qnumber]/*[local-name() = concat($paramname,$position)]">
							<xsl:value-of select="//controller/questions/question[@number = $qnumber]/*[local-name() = concat($paramname,$position)]"/>
					</xsl:when>
					<xsl:when test="//controller/questions/question[@number = $qnumber]/*[local-name() = $paramname]">
							<xsl:value-of select="//controller/questions/question[@number = $qnumber]/*[local-name() = $paramname]"/>
					</xsl:when>
					<xsl:when test="//controller/questions/*[local-name() = concat($paramname,$position)]">
							<xsl:value-of select="//controller/questions/question[@number = $qnumber]/*[local-name() = concat($paramname,$position)]"/>
					</xsl:when>
					<xsl:when test="//controller/questions/*[local-name() = $paramname]">
							<xsl:value-of select="//controller/questions/question[@number = $qnumber]/*[local-name() = $paramname]"/>
					</xsl:when>
					<xsl:when test="//controller/*[local-name() = $paramname]">
							<xsl:value-of select="//controller/*[local-name() = $paramname]"/>
					</xsl:when>
					<xsl:otherwise>
							<xsl:value-of select="$default"/>
					</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<func:result select="$localvar" />
</func:function>

<func:function name="om:getOptions">
	<xsl:variable name="options">
		<xsl:choose>
			<!--controller override-->
			<xsl:when test="//controller/questions/question[@number = $qnumber]/options">
				<xsl:value-of select="//controller/questions/question[@number = $qnumber]/options"/>
			</xsl:when>
			<xsl:when test="count(descendant::par[@kind = 'dropbox' or @kind = 'dropbox Char']) > 0">
					<xsl:value-of select="count(descendant::par[@kind = 'dropbox' or @kind = 'dropbox Char'])"/>
			</xsl:when>
			<xsl:when test="count(descendant::inline[@kind = 'dropcode' or @kind = 'dropcode Char']) > 0">
					<xsl:value-of select="count(descendant::inline[@kind = 'dropcode' or @kind = 'dropcode Char'])"/>
			</xsl:when>
			<xsl:when test="count(descendant::inline[@kind = 'input' or @kind = 'input Char']) > 0">
					<xsl:value-of select="count(descendant::inline[@kind = 'input' or @kind = 'input Char'])"/>
			</xsl:when>
			<xsl:when test="$datasetkey !=''">
				<xsl:apply-templates select="//section[@level='2'][position() = 3]/table/row[cell[position()=1][contains(.,$datasetkey)]]" mode="getOptions"/>
			</xsl:when>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<func:result select="$options" />
</func:function>

<xsl:template match="row" mode="getOptions">
	<xsl:choose>
		<xsl:when test="count(descendant::inline[@kind = 'input' or @kind = 'input Char']) > 0">
			<xsl:value-of select="count(descendant::inline[@kind = 'input' or @kind = 'input Char'])"/>
		</xsl:when>
		<xsl:when test="count(descendant::par[@kind = 'dropbox' or @kind = 'dropbox Char']) > 0">
			<xsl:value-of select="count(descendant::par[@kind = 'dropbox' or @kind = 'dropbox Char'])"/>
		</xsl:when>
		<xsl:when test="count(descendant::par[@kind = 'dropbox' or @kind = 'dropbox Char']) > 0">
					<xsl:value-of select="count(descendant::par[@kind = 'dropbox' or @kind = 'dropbox Char'])"/>
		</xsl:when>
		<xsl:when test="count(descendant::inline[@kind = 'dropcode' or @kind = 'dropcode Char']) > 0">
					<xsl:value-of select="count(descendant::inline[@kind = 'dropcode' or @kind = 'dropcode Char'])"/>
		</xsl:when>
		<xsl:otherwise>0</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<func:function name="om:getChecktotal">
	<xsl:variable name="checktotal">
		<xsl:choose>
			<xsl:when test="//controller/questions/question[@number = $qnumber]/checktotal">
				<xsl:value-of select="//controller/questions/question[@number = $qnumber]/checktotal"/>
			</xsl:when>
			<xsl:when test="count(.//par[@kind = 'dropbox']) > 0">
				<xsl:choose>
					<xsl:when test="count(.//par[@kind = 'dropbox']) > count(.//par[@kind = 'dragbox'])">
						<xsl:value-of select="count(.//par[@kind = 'dragbox'])"/>
					</xsl:when>
					<xsl:when test="count(.//par[@kind = 'dragbox']) > count(.//par[@kind = 'dropbox'])">
						<xsl:value-of select="count(.//par[@kind = 'dropbox'])"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="count(.//par[@kind = 'dropbox'])"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<!-- paragraph type-->
			<xsl:when test="count(.//inline[@kind = 'dropcode']) > 0">
				<xsl:choose>
					<xsl:when test="count(.//inline[@kind = 'dropcode']) > count(.//par[@kind = 'dragbox'])">
						<xsl:value-of select="count(.//par[@kind = 'dragbox'])"/>
					</xsl:when>
					<xsl:when test="count(.//par[@kind = 'dragbox']) > count(.//inline[@kind = 'dropcode'])">
						<xsl:value-of select="count(.//par[@kind = 'dropbox'])"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="count(.//inline[@kind = 'dropcode'])"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'radio-yes') or contains(.,'Radio-yes')]) > 0">
					<xsl:value-of select="'1'"/>
			</xsl:when>
			<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'check-yes') or contains(.,'Check-yes')]) > 0">
				<xsl:value-of select="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'check-yes') or contains(.,'Check-yes')])"/>
			</xsl:when>
			<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'Text') or contains(.,'text')]) > 0">
					<xsl:value-of select="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'Text') or contains(.,'text')])"/>
			</xsl:when>
			<xsl:when test="$datasetkey !=''">
				<xsl:choose>
					<xsl:when test="count(//section[@level='2'][position() = 3]/table/row[cell[position()=1][contains(.,$datasetkey)]]) > 0">
						<xsl:apply-templates select="//section[@level='2'][position() = 3]/table/row[cell[position()=1][contains(.,$datasetkey)]]" mode="getChecktotal"/>
					</xsl:when>
					<xsl:otherwise>[[[[THERE IS NO DATASET DEFINED FOR KEY <xsl:value-of select="$datasetkey"/> OR IT IS MALFORMED]]]]</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<func:result select="$checktotal" />
</func:function>

<xsl:template match="row" mode="getChecktotal">
<xsl:choose>
	<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'check-yes') or contains(.,'Check-yes')]) > 0">
		<xsl:value-of select="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'check-yes') or contains(.,'Check-yes')])"/>
	</xsl:when>
	<xsl:when test="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'radio-yes') or contains(.,'Radio-yes')]) > 0">
		<xsl:value-of select="count(.//inline[@kind = 'input' or @kind = 'input Char'][contains(.,'radio-yes') or contains(.,'Radio-yes')])"/>
	</xsl:when>
	<xsl:otherwise>0</xsl:otherwise>
</xsl:choose>
</xsl:template>

<func:function name="om:useIplace">
	<xsl:param name="mode" />

	<xsl:variable name="idprefix">
			<xsl:choose>
				<xsl:when test="$mode='dragbox'">d</xsl:when>
				<xsl:when test="$mode='dropbox'">a</xsl:when>
				<xsl:when test="$mode='sidelabel'">a</xsl:when>
			</xsl:choose>
	</xsl:variable>

	<xsl:variable name="useIplace">
			<xsl:choose>
			<xsl:otherwise>
			 	<xsl:value-of select="count(//controller/questions/question[@number = $qnumber]/iplace[contains(@id,$idprefix)])" />
			</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>
	<func:result select="$useIplace" />
</func:function>

<func:function name="om:getIplaceParam">
	<xsl:param name="paramname" />
	<xsl:param name="id" />
	<xsl:variable name="result">
		<xsl:choose>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<func:result select="$result" />
</func:function>


  <!-- Get drop id-->
  <!--
<func:function name="om:getId">
    <xsl:param name="text"/>
	<xsl:param name="mode"/>

	<xsl:variable name="prefix">
		<xsl:choose>
			<xsl:when test="$mode='drop'">a</xsl:when>
			<xsl:when test="$mode='drag'">d</xsl:when>
		</xsl:choose>

	</xsl:variable>

      	<xsl:variable name="lowerc" select="translate($text, $ucletters, $lcletters)"/>
		<xsl:variable name="trim" select="om:trim($lowerc)"/>
		<xsl:variable name="result">
			<xsl:choose>
				<xsl:when test="$trim = ''"><xsl:value-of select="concat($prefix,'999')"/></xsl:when>
				<xsl:when test="$trim > 0"><xsl:value-of select="concat($prefix,$trim)"/></xsl:when>
				<xsl:otherwise><xsl:value-of select="concat($prefix,'999')"/></xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

	<func:result select="$result" />
</func:function>
-->

<!--these should be amalgamated but drag needs just the number to product d2, drag2-->
<func:function name="om:getId">
    <xsl:param name="text"/>
	<xsl:param name="mode"/>

	<xsl:variable name="prefix">
		<xsl:choose>
			<xsl:when test="$mode='drop'">a</xsl:when>
			<xsl:when test="$mode='drag'">d</xsl:when>
		</xsl:choose>
	</xsl:variable>

      	<xsl:variable name="lowerc" select="translate($text, $ucletters, $lcletters)"/>
		<xsl:variable name="trim" select="om:trim($lowerc)"/>
		<xsl:variable name="firstpart">
			<xsl:choose>
				<xsl:when test="contains($trim,' ')"><xsl:value-of select="substring-before($trim,' ')"/></xsl:when>
				<xsl:otherwise><xsl:value-of select="$trim"/></xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="firstpartnum" select="translate($firstpart,'abcdefghi', '123456789')"/>
		<xsl:variable name="result">
			<xsl:choose>
				<xsl:when test="$firstpartnum = ''"><xsl:value-of select="concat($prefix,'998')"/></xsl:when>
				<xsl:when test="$firstpartnum > 0"><xsl:value-of select="concat($prefix,$firstpartnum)"/></xsl:when>
				<xsl:otherwise><xsl:value-of select="concat($prefix,'999')"/></xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

	<func:result select="$result" />
</func:function>


<xsl:template name="getDropOptions">
<option display="(Select answer)" value="d0"/>
		<xsl:variable name="pagecount" select="count(preceding::section[@level='2'])"/>
 		<xsl:apply-templates select="//par[@kind = 'dragbox'][count(preceding::section[@level='2'])=$pagecount]" mode="getDropOptions"/>

</xsl:template>

<xsl:template match="par[@kind = 'dragbox']" mode="getDropOptions">
		<xsl:variable name="dragtarget" select="descendant::inline[@kind = 'dragtarget']"/>
		<xsl:variable name="id" select="om:getDragId($dragtarget,'drag')"/>
		<xsl:variable name="trimmedtext" select="om:trim(text())"/>
		<option display="{$trimmedtext}" value="d{$id}"/>
</xsl:template>

<func:function name="om:trim">
	    <xsl:param name="text"/>
		<xsl:choose>
			<xsl:when test="$text = ''">
				<func:result select="''" />
			</xsl:when>
			<xsl:when test="$text = ' '">
				<func:result select="''" />
			</xsl:when>
			<xsl:when test="$text = '  '">
				<func:result select="''" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="left-trim">
					<xsl:call-template name="left-trim">
						<xsl:with-param name="text" select="$text"/>
					</xsl:call-template>
				</xsl:variable>
				<xsl:variable name="right-trim">
					<xsl:call-template name="right-trim">
						<xsl:with-param name="text" select="$left-trim"/>
					</xsl:call-template>
				</xsl:variable>
				<func:result select="$right-trim" />
			</xsl:otherwise>
		</xsl:choose>
</func:function>

<xsl:template name="left-trim">
  <xsl:param name="text" />
  <xsl:choose>
    <xsl:when test="normalize-space(substring($text, 1, 1)) = ''">
      <xsl:call-template name="left-trim">
        <xsl:with-param name="text" select="substring($text, 2)" />
      </xsl:call-template>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="$text" />
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template name="right-trim">
  <xsl:param name="text" />

  <xsl:choose>
    <xsl:when test="normalize-space(substring($text, string-length($text))) = ''">
      <xsl:call-template name="right-trim">
        <xsl:with-param name="text" select="substring($text, 1, string-length($text) - 1)" />
      </xsl:call-template>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="$text" />
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>


</xsl:stylesheet>