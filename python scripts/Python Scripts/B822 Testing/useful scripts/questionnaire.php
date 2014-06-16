<?php
include "check_user.php";
?>
<html>
<head>
<title>B822 09E NEO-FFI</title>
<link rel="stylesheet" type="text/css" href="accessible.css" />
<script type="text/javascript">
var NUMBER_OF_BLANKS_ALLOWED = 10;
</script>
<script type="text/javascript" src="accessible.js">
</script>
</head>
<body>
<div class="bigBox">
<?php
include "get_key.php";
?>
<form method="post" action="accessible_save_to_database.php" onsubmit="return validate_form(this);">
<div id="container">
<table border="0"cellpadding="0" cellspacing="1">
<tr class="toprow">
    <td colspan="2" align="center">&nbsp;</td>
    <td align="center">SD</td>
   <td align="center">D</td>
    <td align="center">N</td>
    <td align="center">A</td>
    <td align="center">SA</td>
</tr>

    <tr class="odd">
        <td class="number" align="right"><b>1</b></td>
        <td>I am not a worrier.</td>
        <td><input type="radio" name="1" value="0" /></td>
        <td><input type="radio" name="1" value="1" /></td>
        <td><input type="radio" name="1" value="2" /></td>
        <td><input type="radio" name="1" value="3" /></td>
        <td><input type="radio" name="1" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>2</b></td>
        <td>I like to have a lot of people around me.</td>
        <td><input type="radio" name="2" value="0" /></td>
        <td><input type="radio" name="2" value="1" /></td>
        <td><input type="radio" name="2" value="2" /></td>
        <td><input type="radio" name="2" value="3" /></td>
        <td><input type="radio" name="2" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>3</b></td>
        <td>I don't like to waste my time daydreaming.</td>
        <td><input type="radio" name="3" value="0" /></td>
        <td><input type="radio" name="3" value="1" /></td>
        <td><input type="radio" name="3" value="2" /></td>
        <td><input type="radio" name="3" value="3" /></td>
        <td><input type="radio" name="3" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>4</b></td>
        <td>I try to be courteous to everyone I meet.</td>
        <td><input type="radio" name="4" value="0" /></td>
        <td><input type="radio" name="4" value="1" /></td>
        <td><input type="radio" name="4" value="2" /></td>
        <td><input type="radio" name="4" value="3" /></td>
        <td><input type="radio" name="4" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>5</b></td>
        <td>I keep my belongings neat and clean.</td>
        <td><input type="radio" name="5" value="0" /></td>
        <td><input type="radio" name="5" value="1" /></td>
        <td><input type="radio" name="5" value="2" /></td>
        <td><input type="radio" name="5" value="3" /></td>
        <td><input type="radio" name="5" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>6</b></td>
        <td>I often feel inferior to others.</td>
        <td><input type="radio" name="6" value="0" /></td>
        <td><input type="radio" name="6" value="1" /></td>
        <td><input type="radio" name="6" value="2" /></td>
        <td><input type="radio" name="6" value="3" /></td>
        <td><input type="radio" name="6" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>7</b></td>
        <td>I laugh easily.</td>
        <td><input type="radio" name="7" value="0" /></td>
        <td><input type="radio" name="7" value="1" /></td>
        <td><input type="radio" name="7" value="2" /></td>
        <td><input type="radio" name="7" value="3" /></td>
        <td><input type="radio" name="7" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>8</b></td>
        <td>Once I find the right way to do something, I stick to it.</td>
        <td><input type="radio" name="8" value="0" /></td>
        <td><input type="radio" name="8" value="1" /></td>
        <td><input type="radio" name="8" value="2" /></td>
        <td><input type="radio" name="8" value="3" /></td>
        <td><input type="radio" name="8" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>9</b></td>
        <td>I often get into arguments with my family and co-workers.</td>
        <td><input type="radio" name="9" value="0" /></td>
        <td><input type="radio" name="9" value="1" /></td>
        <td><input type="radio" name="9" value="2" /></td>
        <td><input type="radio" name="9" value="3" /></td>
        <td><input type="radio" name="9" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>10</b></td>
        <td>I'm pretty good about pacing myself so as to get things done on time.</td>
        <td><input type="radio" name="10" value="0" /></td>
        <td><input type="radio" name="10" value="1" /></td>
        <td><input type="radio" name="10" value="2" /></td>
        <td><input type="radio" name="10" value="3" /></td>
        <td><input type="radio" name="10" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>11</b></td>
        <td>When I'm under a great deal of stress, sometimes I feel like I'm going to pieces.</td>
        <td><input type="radio" name="11" value="0" /></td>
        <td><input type="radio" name="11" value="1" /></td>
        <td><input type="radio" name="11" value="2" /></td>
        <td><input type="radio" name="11" value="3" /></td>
        <td><input type="radio" name="11" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>12</b></td>
        <td>I don't consider myself especially "light-hearted".</td>
        <td><input type="radio" name="12" value="0" /></td>
        <td><input type="radio" name="12" value="1" /></td>
        <td><input type="radio" name="12" value="2" /></td>
        <td><input type="radio" name="12" value="3" /></td>
        <td><input type="radio" name="12" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>13</b></td>
        <td>I am intrigued by the patterns I find in art and nature.</td>
        <td><input type="radio" name="13" value="0" /></td>
        <td><input type="radio" name="13" value="1" /></td>
        <td><input type="radio" name="13" value="2" /></td>
        <td><input type="radio" name="13" value="3" /></td>
        <td><input type="radio" name="13" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>14</b></td>
        <td>Some people think I'm selfish and egotistical.</td>
        <td><input type="radio" name="14" value="0" /></td>
        <td><input type="radio" name="14" value="1" /></td>
        <td><input type="radio" name="14" value="2" /></td>
        <td><input type="radio" name="14" value="3" /></td>
        <td><input type="radio" name="14" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>15</b></td>
        <td>I am not a very methodical person.</td>
        <td><input type="radio" name="15" value="0" /></td>
        <td><input type="radio" name="15" value="1" /></td>
        <td><input type="radio" name="15" value="2" /></td>
        <td><input type="radio" name="15" value="3" /></td>
        <td><input type="radio" name="15" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>16</b></td>
        <td>I rarely feel lonely or blue.</td>
        <td><input type="radio" name="16" value="0" /></td>
        <td><input type="radio" name="16" value="1" /></td>
        <td><input type="radio" name="16" value="2" /></td>
        <td><input type="radio" name="16" value="3" /></td>
        <td><input type="radio" name="16" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>17</b></td>
        <td>I really enjoy talking to people.</td>
        <td><input type="radio" name="17" value="0" /></td>
        <td><input type="radio" name="17" value="1" /></td>
        <td><input type="radio" name="17" value="2" /></td>
        <td><input type="radio" name="17" value="3" /></td>
        <td><input type="radio" name="17" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>18</b></td>
        <td>I believe letting students hear controversial speakers can only confuse and mislead them.</td>
        <td><input type="radio" name="18" value="0" /></td>
        <td><input type="radio" name="18" value="1" /></td>
        <td><input type="radio" name="18" value="2" /></td>
        <td><input type="radio" name="18" value="3" /></td>
        <td><input type="radio" name="18" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>19</b></td>
        <td>I would rather cooperate with others than compete with them.</td>
        <td><input type="radio" name="19" value="0" /></td>
        <td><input type="radio" name="19" value="1" /></td>
        <td><input type="radio" name="19" value="2" /></td>
        <td><input type="radio" name="19" value="3" /></td>
        <td><input type="radio" name="19" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>20</b></td>
        <td>I try to perform all the tasks assigned to me conscientiously.</td>
        <td><input type="radio" name="20" value="0" /></td>
        <td><input type="radio" name="20" value="1" /></td>
        <td><input type="radio" name="20" value="2" /></td>
        <td><input type="radio" name="20" value="3" /></td>
        <td><input type="radio" name="20" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>21</b></td>
        <td>I often feel tense and jittery.</td>
        <td><input type="radio" name="21" value="0" /></td>
        <td><input type="radio" name="21" value="1" /></td>
        <td><input type="radio" name="21" value="2" /></td>
        <td><input type="radio" name="21" value="3" /></td>
        <td><input type="radio" name="21" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>22</b></td>
        <td>I like to be where the action is.</td>
        <td><input type="radio" name="22" value="0" /></td>
        <td><input type="radio" name="22" value="1" /></td>
        <td><input type="radio" name="22" value="2" /></td>
        <td><input type="radio" name="22" value="3" /></td>
        <td><input type="radio" name="22" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>23</b></td>
        <td>Poetry has little or no effect on me.</td>
        <td><input type="radio" name="23" value="0" /></td>
        <td><input type="radio" name="23" value="1" /></td>
        <td><input type="radio" name="23" value="2" /></td>
        <td><input type="radio" name="23" value="3" /></td>
        <td><input type="radio" name="23" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>24</b></td>
        <td>I tend to be cynical and sceptical of others' intentions.</td>
        <td><input type="radio" name="24" value="0" /></td>
        <td><input type="radio" name="24" value="1" /></td>
        <td><input type="radio" name="24" value="2" /></td>
        <td><input type="radio" name="24" value="3" /></td>
        <td><input type="radio" name="24" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>25</b></td>
        <td>I have a clear set of goals and work toward them in an orderly fashion.</td>
        <td><input type="radio" name="25" value="0" /></td>
        <td><input type="radio" name="25" value="1" /></td>
        <td><input type="radio" name="25" value="2" /></td>
        <td><input type="radio" name="25" value="3" /></td>
        <td><input type="radio" name="25" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>26</b></td>
        <td>Sometimes I feel completely worthless.</td>
        <td><input type="radio" name="26" value="0" /></td>
        <td><input type="radio" name="26" value="1" /></td>
        <td><input type="radio" name="26" value="2" /></td>
        <td><input type="radio" name="26" value="3" /></td>
        <td><input type="radio" name="26" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>27</b></td>
        <td>I usually prefer to do things alone.</td>
        <td><input type="radio" name="27" value="0" /></td>
        <td><input type="radio" name="27" value="1" /></td>
        <td><input type="radio" name="27" value="2" /></td>
        <td><input type="radio" name="27" value="3" /></td>
        <td><input type="radio" name="27" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>28</b></td>
        <td>I often try new and foreign foods.</td>
        <td><input type="radio" name="28" value="0" /></td>
        <td><input type="radio" name="28" value="1" /></td>
        <td><input type="radio" name="28" value="2" /></td>
        <td><input type="radio" name="28" value="3" /></td>
        <td><input type="radio" name="28" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>29</b></td>
        <td>I believe that most people will take advantage of you if you let them.</td>
        <td><input type="radio" name="29" value="0" /></td>
        <td><input type="radio" name="29" value="1" /></td>
        <td><input type="radio" name="29" value="2" /></td>
        <td><input type="radio" name="29" value="3" /></td>
        <td><input type="radio" name="29" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>30</b></td>
        <td>I waste a lot of time before settling down to work.</td>
        <td><input type="radio" name="30" value="0" /></td>
        <td><input type="radio" name="30" value="1" /></td>
        <td><input type="radio" name="30" value="2" /></td>
        <td><input type="radio" name="30" value="3" /></td>
        <td><input type="radio" name="30" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>31</b></td>
        <td>I rarely feel fearful or anxious.</td>
        <td><input type="radio" name="31" value="0" /></td>
        <td><input type="radio" name="31" value="1" /></td>
        <td><input type="radio" name="31" value="2" /></td>
        <td><input type="radio" name="31" value="3" /></td>
        <td><input type="radio" name="31" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>32</b></td>
        <td>I often feel as if I'm bursting with energy.</td>
        <td><input type="radio" name="32" value="0" /></td>
        <td><input type="radio" name="32" value="1" /></td>
        <td><input type="radio" name="32" value="2" /></td>
        <td><input type="radio" name="32" value="3" /></td>
        <td><input type="radio" name="32" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>33</b></td>
        <td>I seldom notice the moods or feelings that different environments produce.</td>
        <td><input type="radio" name="33" value="0" /></td>
        <td><input type="radio" name="33" value="1" /></td>
        <td><input type="radio" name="33" value="2" /></td>
        <td><input type="radio" name="33" value="3" /></td>
        <td><input type="radio" name="33" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>34</b></td>
        <td>Most people I know like me.</td>
        <td><input type="radio" name="34" value="0" /></td>
        <td><input type="radio" name="34" value="1" /></td>
        <td><input type="radio" name="34" value="2" /></td>
        <td><input type="radio" name="34" value="3" /></td>
        <td><input type="radio" name="34" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>35</b></td>
        <td>I work hard to accomplish my goals.</td>
        <td><input type="radio" name="35" value="0" /></td>
        <td><input type="radio" name="35" value="1" /></td>
        <td><input type="radio" name="35" value="2" /></td>
        <td><input type="radio" name="35" value="3" /></td>
        <td><input type="radio" name="35" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>36</b></td>
        <td>I often get angry at the way people treat me.</td>
        <td><input type="radio" name="36" value="0" /></td>
        <td><input type="radio" name="36" value="1" /></td>
        <td><input type="radio" name="36" value="2" /></td>
        <td><input type="radio" name="36" value="3" /></td>
        <td><input type="radio" name="36" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>37</b></td>
        <td>I am a cheerful, high-spirited person.</td>
        <td><input type="radio" name="37" value="0" /></td>
        <td><input type="radio" name="37" value="1" /></td>
        <td><input type="radio" name="37" value="2" /></td>
        <td><input type="radio" name="37" value="3" /></td>
        <td><input type="radio" name="37" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>38</b></td>
        <td>I believe we should look to our religious authorities for decisions on moral issues.</td>
        <td><input type="radio" name="38" value="0" /></td>
        <td><input type="radio" name="38" value="1" /></td>
        <td><input type="radio" name="38" value="2" /></td>
        <td><input type="radio" name="38" value="3" /></td>
        <td><input type="radio" name="38" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>39</b></td>
        <td>Some people think of me as cold and calculating.</td>
        <td><input type="radio" name="39" value="0" /></td>
        <td><input type="radio" name="39" value="1" /></td>
        <td><input type="radio" name="39" value="2" /></td>
        <td><input type="radio" name="39" value="3" /></td>
        <td><input type="radio" name="39" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>40</b></td>
        <td>When I make a commitment, I can always be counted on to follow through.</td>
        <td><input type="radio" name="40" value="0" /></td>
        <td><input type="radio" name="40" value="1" /></td>
        <td><input type="radio" name="40" value="2" /></td>
        <td><input type="radio" name="40" value="3" /></td>
        <td><input type="radio" name="40" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>41</b></td>
        <td>Too often, when things go wrong, I get discouraged and feel like giving up.</td>
        <td><input type="radio" name="41" value="0" /></td>
        <td><input type="radio" name="41" value="1" /></td>
        <td><input type="radio" name="41" value="2" /></td>
        <td><input type="radio" name="41" value="3" /></td>
        <td><input type="radio" name="41" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>42</b></td>
        <td>I am not a cheerful optimist.</td>
        <td><input type="radio" name="42" value="0" /></td>
        <td><input type="radio" name="42" value="1" /></td>
        <td><input type="radio" name="42" value="2" /></td>
        <td><input type="radio" name="42" value="3" /></td>
        <td><input type="radio" name="42" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>43</b></td>
        <td>Sometimes when I am reading poetry or looking at a work or art, I feel a chill or wave of excitement.</td>
        <td><input type="radio" name="43" value="0" /></td>
        <td><input type="radio" name="43" value="1" /></td>
        <td><input type="radio" name="43" value="2" /></td>
        <td><input type="radio" name="43" value="3" /></td>
        <td><input type="radio" name="43" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>44</b></td>
        <td>I'm hard-headed and tough-minded in my attitudes.</td>
        <td><input type="radio" name="44" value="0" /></td>
        <td><input type="radio" name="44" value="1" /></td>
        <td><input type="radio" name="44" value="2" /></td>
        <td><input type="radio" name="44" value="3" /></td>
        <td><input type="radio" name="44" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>45</b></td>
        <td>Sometimes I'm not as dependable or reliable as I should be.</td>
        <td><input type="radio" name="45" value="0" /></td>
        <td><input type="radio" name="45" value="1" /></td>
        <td><input type="radio" name="45" value="2" /></td>
        <td><input type="radio" name="45" value="3" /></td>
        <td><input type="radio" name="45" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>46</b></td>
        <td>I am seldom sad or depressed.</td>
        <td><input type="radio" name="46" value="0" /></td>
        <td><input type="radio" name="46" value="1" /></td>
        <td><input type="radio" name="46" value="2" /></td>
        <td><input type="radio" name="46" value="3" /></td>
        <td><input type="radio" name="46" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>47</b></td>
        <td>My life is fast-paced.</td>
        <td><input type="radio" name="47" value="0" /></td>
        <td><input type="radio" name="47" value="1" /></td>
        <td><input type="radio" name="47" value="2" /></td>
        <td><input type="radio" name="47" value="3" /></td>
        <td><input type="radio" name="47" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>48</b></td>
        <td>I have little interest in speculating on the nature of the universe or the human condition.</td>
        <td><input type="radio" name="48" value="0" /></td>
        <td><input type="radio" name="48" value="1" /></td>
        <td><input type="radio" name="48" value="2" /></td>
        <td><input type="radio" name="48" value="3" /></td>
        <td><input type="radio" name="48" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>49</b></td>
        <td>I generally try to be thoughtful and considerate.</td>
        <td><input type="radio" name="49" value="0" /></td>
        <td><input type="radio" name="49" value="1" /></td>
        <td><input type="radio" name="49" value="2" /></td>
        <td><input type="radio" name="49" value="3" /></td>
        <td><input type="radio" name="49" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>50</b></td>
        <td>I am a productive person who always get the job done.</td>
        <td><input type="radio" name="50" value="0" /></td>
        <td><input type="radio" name="50" value="1" /></td>
        <td><input type="radio" name="50" value="2" /></td>
        <td><input type="radio" name="50" value="3" /></td>
        <td><input type="radio" name="50" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>51</b></td>
        <td>I often feel helpless and want someone else to solve my problems.</td>
        <td><input type="radio" name="51" value="0" /></td>
        <td><input type="radio" name="51" value="1" /></td>
        <td><input type="radio" name="51" value="2" /></td>
        <td><input type="radio" name="51" value="3" /></td>
        <td><input type="radio" name="51" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>52</b></td>
        <td>I am a very active person.</td>
        <td><input type="radio" name="52" value="0" /></td>
        <td><input type="radio" name="52" value="1" /></td>
        <td><input type="radio" name="52" value="2" /></td>
        <td><input type="radio" name="52" value="3" /></td>
        <td><input type="radio" name="52" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>53</b></td>
        <td>I have a lot of intellectual curiosity.</td>
        <td><input type="radio" name="53" value="0" /></td>
        <td><input type="radio" name="53" value="1" /></td>
        <td><input type="radio" name="53" value="2" /></td>
        <td><input type="radio" name="53" value="3" /></td>
        <td><input type="radio" name="53" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>54</b></td>
        <td>If I don't like people, I let them know it.</td>
        <td><input type="radio" name="54" value="0" /></td>
        <td><input type="radio" name="54" value="1" /></td>
        <td><input type="radio" name="54" value="2" /></td>
        <td><input type="radio" name="54" value="3" /></td>
        <td><input type="radio" name="54" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>55</b></td>
        <td>I never seem to be able to get organized.</td>
        <td><input type="radio" name="55" value="0" /></td>
        <td><input type="radio" name="55" value="1" /></td>
        <td><input type="radio" name="55" value="2" /></td>
        <td><input type="radio" name="55" value="3" /></td>
        <td><input type="radio" name="55" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>56</b></td>
        <td>At times I have been so ashamed I just wanted to hide.</td>
        <td><input type="radio" name="56" value="0" /></td>
        <td><input type="radio" name="56" value="1" /></td>
        <td><input type="radio" name="56" value="2" /></td>
        <td><input type="radio" name="56" value="3" /></td>
        <td><input type="radio" name="56" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>57</b></td>
        <td>I would rather go my own way than be a leader of others.</td>
        <td><input type="radio" name="57" value="0" /></td>
        <td><input type="radio" name="57" value="1" /></td>
        <td><input type="radio" name="57" value="2" /></td>
        <td><input type="radio" name="57" value="3" /></td>
        <td><input type="radio" name="57" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>58</b></td>
        <td>I often enjoy playing with theories or abstract ideas.</td>
        <td><input type="radio" name="58" value="0" /></td>
        <td><input type="radio" name="58" value="1" /></td>
        <td><input type="radio" name="58" value="2" /></td>
        <td><input type="radio" name="58" value="3" /></td>
        <td><input type="radio" name="58" value="4" /></td>
    </tr>
    
    <tr class="odd">
        <td class="number" align="right"><b>59</b></td>
        <td>If necessary, I am willing to manipulate people to get what I want.</td>
        <td><input type="radio" name="59" value="0" /></td>
        <td><input type="radio" name="59" value="1" /></td>
        <td><input type="radio" name="59" value="2" /></td>
        <td><input type="radio" name="59" value="3" /></td>
        <td><input type="radio" name="59" value="4" /></td>
    </tr>
    
    <tr class="even">
        <td class="number" align="right"><b>60</b></td>
        <td>I strive for excellence in everything I do.</td>
        <td><input type="radio" name="60" value="0" /></td>
        <td><input type="radio" name="60" value="1" /></td>
        <td><input type="radio" name="60" value="2" /></td>
        <td><input type="radio" name="60" value="3" /></td>
        <td><input type="radio" name="60" value="4" /></td>
    </tr>
    
</table><br>
<div id="buttondiv">
<input id="submit_button" type="submit" value="Save my Answers" />
</div>
</div>
</form>
</div>
</body>
</html>
