function getI(a){
    document.getElementById(a);
}


var Culc=(function(string){
    var example=string;                
    var allNumbs=[];                    
    var num="";                         
    
    function scope(cloneExample){      

        for(var i=0;i<cloneExample.length;i++){    
            var chek=0;                                  
            if(cloneExample[i]=="("){                       
                for(var j=i+1;j<cloneExample.length;j++){    
                    
                    if(cloneExample[j]=="("){                
                        chek++;
                    }else if(cloneExample[j]==")"&&chek>0){   
                        chek--;
                    }else if(cloneExample[j]==")"&&chek==0){    
                        var cutInScope=cloneExample.substr(i,j-i+1);        
                        var cul=new Culc(cutInScope.substr(1,cloneExample.length-1)); 
                        var t=cul.ob();
                        example=example.replace(cutInScope,t);      
                        break;
                        
                    }
                }
                
            }
        }
    }
    
    function pars(){
        for(var i=0;i<example.length;i++){
            if(example[i]=="-"&&example[i-1]*1!=example[i-1]){ 
                num+="-";
            }else if(example[i]*1==example[i]||example[i]=="."){ 
                num+=example[i];
                if(i==example.length-1){    
                    allNumbs.push(num);
                }
            }else if(example[i]*1!=example[i]&&example[i]!="c"&&example[i]!="s"){ 
                allNumbs.push(num);
                allNumbs.push(example[i]);
                num="";
            }else if(example[i]=="c"||example[i]=="s"){      
                num=""+example[i]+""+example[i+1]+example[i+2];
                allNumbs.push(num);                             
                num="";                             
                i+=2;
            }
            }
       }
        
        
        function sin(){                                  
            for(var i=0;i<allNumbs.length;i++){
                if(allNumbs[i]=="sin"){
                    allNumbs[i]=Math.sin(parseFloat(allNumbs[i+1])).toFixed(2);
                    allNumbs.splice(i+1,1);
                    i=0;
                }
            }
        }
        
        function cos(){                                
            for(var i=0;i<allNumbs.length;i++){
                if(allNumbs[i]=="cos"){
                    allNumbs[i]=Math.cos(parseFloat(allNumbs[i+1])).toFixed(2);
                    i++;
                    allNumbs.splice(i,1);
                    i=0;
                }
            }
        }
        function sqr(){                                    
            for(var i=0;i<allNumbs.length;i++){
                if(allNumbs[i]=="sqr"){
                    allNumbs[i]=Math.sqrt(parseFloat(allNumbs[i+1])).toFixed(2);
                    allNumbs.splice(i+1,1);
                    i=0;
                }
            }
        }
        
        function pow(){                                    
            for(var i=0;i<allNumbs.length;i++){
                if(allNumbs[i]=="^"){
                    allNumbs[i-1]=Math.pow(parseFloat(allNumbs[i-1]),parseFloat(allNumbs[i+1]));
                    allNumbs.splice(i,2);
                    i=0;
                }
            }
        }
        
        function mD(){                                      
            for(var i=0;i<allNumbs.length;i++){
                 if(allNumbs[i]=="*"){
                    allNumbs[i-1]=parseFloat(allNumbs[i-1])*parseFloat(allNumbs[i+1]);
                    allNumbs.splice(i,2);
                    i=0;
                }else if(allNumbs[i]=="/"){
                    allNumbs[i-1]=parseFloat(allNumbs[i-1])/parseFloat(allNumbs[i+1]);
                    allNumbs.splice(i,2);
                    i=0;
                }
            }
        }
        function addOrSub(){                                   
            for(var i=0;i<allNumbs.length;i++){
                if(allNumbs[i]=="-"){
                    allNumbs[i-1]=parseFloat(allNumbs[i-1])-parseFloat(allNumbs[i+1]);
                    allNumbs.splice(i,2);
                    i=0;
                }else if(allNumbs[i]=="+"){
                    allNumbs[i-1]=parseFloat(allNumbs[i-1])+parseFloat(allNumbs[i+1]);
                    allNumbs.splice(i,2);
                    i=0;
                }
            }
        }
    
        this.ob=function(){                        
            scope(example);                                     
            pars(example);
            sin();
            cos();
            sqr();
            pow();
            mD();
            addOrSub();
            return allNumbs[0];      
            
        }
    
})

$('.but').click(function(){          
    var monitor=$('#main');
    var s=monitor.val()+""+this.value
    monitor.val(s);
})

var hide=false;   


$('#con').click(function(){             
    var exepmple=$('#main').val();
    var sum= new Culc(exepmple);
    $(".prev").append('<p>'+exepmple+"="+sum.ob()+'</p>')   
    $('#main').val(sum.ob());                               
    
})
$("a").click(function(){            
    if(hide){
        $(".prev").hide();
        hide=false;
    }else{
        $(".prev").show();
        hide=true;
    }
})
$(".butC").click(function(){          
    $('#main').val("");
    
})
        
    
    