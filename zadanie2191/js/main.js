$(document).ready(function() {
    $(window).scroll(function() {
        classOnScroll();
});
});

function classOnScroll() {
    
    var height = $("#main-header").height();
    var currentPosition = $(window).scrollTop();

    if (currentPosition >= height && ($(window).innerWidth()>768)) {
        
        $('#main-nav').addClass('menu-scrolled');
        
        $('#main-nav').find('a').on({
            'mouseenter': function() {
                $(this).css({'color':'#777777', 'transition': 'all 0.5s'});
            },
            'mouseleave': function() {
                $(this).css({'color':'#FFFFFF', 'transition': 'all 0.5s'});
            }
        });
    } 
    
    else if (($(window).innerWidth()<768)) {
    
        $('#main-nav').find('a').on({
            'mouseenter': function() {
                $(this).css({'color':'#777777', 'transition': 'all 0.5s'});
            },
            'mouseleave': function() {
                $(this).css({'color':'#0ed8d6', 'transition': 'all 0.5s'});
            }
        });
    }
    
    else {
        
        $('#main-nav').removeClass('menu-scrolled');
        
        $('#main-nav').find('a').on({
            'mouseenter': function() {
                $(this).css({'color':'#0ed8d6', 'transition': 'all 0.5s'});
            },
            'mouseleave': function() {
                $(this).css({'color':'#FFFFFF', 'transition': 'all 0.5s'});
            }
        });
    }
};