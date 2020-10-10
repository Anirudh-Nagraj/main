<script>
  $(function(){
    if($(window).width() < 768){
      $(".navbar-nav li span.trigger").on("click",function(e){
        console.log('triggered');
            var current=$(this).next();
        var currentParent=$(this).parent();
            var grandparent=$(this).parent().parent();
        console.log(current.attr('class'));
        
            if($(this).hasClass('glyphicon-plus')||$(this).hasClass('glyphicon-minus'))
                $(this).toggleClass('glyphicon-plus glyphicon-minus');
          
        
            grandparent.find('.glyphicon-minus').not(this).toggleClass('glyphicon-plus glyphicon-minus');
            grandparent.find(".open").not(currentParent).removeClass('open');
        
        if(currentParent.hasClass('open')){
          currentParent.removeClass('open');
        } else {
          currentParent.addClass('open');
        } 
        });
        
    }
  });
</script>