CSS
===
img {
    width: 100%;
}
.record_template {
    width: 90%;
}

div.dataplus_record, div.dataplus_comment{
    margin-bottom: 2em;
}

div.dataplus_record table.record_template, div.dataplus_comment table.dataplus_comment_output {
    border-top: 1px solid #ede9e0;
}

div.dataplus_record table.record_template tr, div.dataplus_comment table.dataplus_comment_output tr {
    border-bottom: 1px solid #ede9e0;
}

div.dataplus_record_count, div.dataplus_record_navigation, div.dataplus_search_amend{
    text-align: center;
}


Header
======
<div class="dataplus_record_navigation">##Record navigation##</div>
<div class="dataplus_record_count">##Record count##</div>

Record
======
<table class="record_template">
<tr><td> </td><td>[[image]]</td></tr>
<tr><td> </td><td>[[caption]]</td></tr>
<tr><td><strong>reference</strong></td><td>[[reference]]</td></tr>
<tr><td><strong>category</strong></td><td>[[category]]</td></tr>
<tr><td colspan="2"> </td></tr>
</table>


Footer
======
<div class="dataplus_record_count">##Record count##</div>
<div class="dataplus_record_navigation">##Record navigation##</div>