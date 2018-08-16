$(document).ready(function(){
    selectbox();
});

function selectbox(se)
{
    $("select").each(function(){
        /*var topHeight=$(this).parent(".custom_select").height();*/
        var select=$(this);
        $(this).wrap("<div class='custom_select'></span>");
        $(this).parent().append("<span class='selectValue' style='display: inline-block;'><span class='emptyselect'></span><span class='selectedValue'></span><span class='arrow'></span></span>");
        // var attrName=$(this).attr('name');
        // var attrId=$(this).attr('id');
        // $(this).siblings(".selectValue").children(".selectedValue").attr('name',attrName);
        // $(this).siblings(".selectValue").children(".selectedValue").attr('id',attrId);
        $(this).each(function() {
          $.each(this.attributes, function() {
            // this.attributes is not a plain object, but an array
            // of attribute nodes, which contain both the name and value
            if(this.specified) {
              if(this.name!='class')
              {
                $(select).siblings(".selectValue").children(".selectedValue").attr(this.name, this.value);
              }
            }
          });
        });

        $(this).children("option").each(function(){
            if($(this).attr("selected")=='selected')
            {
                var defaultValue=$(this).text();
                //console.log(defaultValue);
                $(this).parent("select").siblings(".selectValue").children(".selectedValue").text(defaultValue);
            }
        });
        $(this).change(function(){
            var optionValue=$(this).val();
            //console.log(optionValue);
            $(this).siblings(".selectValue").siblings(".selectedValue").text(optionValue);
        });
        $(this).parent().append("<ul class='listValue'></ul>");
        $(this).children("option").each(function(){
            var data=$(this).text();
            $(this).parent('select').parent('.custom_select').children('.listValue').append("<li>"+data+"</li>");           
        });
        $(this).siblings(".listValue").children("li").each(function(){
            $("body").click(function(){
                $(this).parent('.listValue').parent('.custom_select').children(".selectValue").siblings(".listValue").hide();   
            });
            $(this).click(function(){
                var getText=$(this).text();
                $(this).parent('.listValue').parent('.custom_select').children('.selectValue').children('.selectedValue').text(getText);
                $(this).parent('.listValue').parent('.custom_select').children('select').attr('value',getText);
                $(this).parent('.listValue').parent('.custom_select').children(".selectValue").siblings(".listValue").hide();
                $(this).parent('.listValue').parent('.custom_select').children('select').children('option').each(function(){
                    if($(this).text()==getText)
                    {
                        $(this).attr("selected","selected")
                    }
                    else
                    {
                        $(this).removeAttr("selected")                      
                    }
                });
            });
        });
        var span=$(this).parent().children(".selectValue");
        var spanHeight=span.height();
        var spanHeight=spanHeight/2;
        span.children(".selectedValue").css('line-height',spanHeight+'px');
    });
    $(".listValue").hide();
    $(".custom_select").each(function(){
        $(this).children(".selectValue").click(function(){
            $(this).siblings("select").change();
            $(this).siblings(".listValue").toggle();            
        });
    });
    $(document).click(function(se) { 
        if(($(se.target).attr('class')!='selectValue') && ($(se.target).attr('class')!='selectedValue') && ($(se.target).attr('class')!='arrow'))
        {
            $(".listValue").hide();
        }
    });
}