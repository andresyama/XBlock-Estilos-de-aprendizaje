/* Javascript for ReglasXBlock. */
function ReglasEstudiante(runtime, element) {
    var handlerUrl = runtime.handlerUrl(element, 'show_resources');
    var handlerUrlLoad = runtime.handlerUrl(element, 'load_test');

    $(function ($) {          

        var tag = ""
        var recursoLoad1= ""
        var recursoLoad2= ""
        
        $.ajax({
            type: "POST",
            url: handlerUrlLoad,
            data: "null",
            success: function (data) {
                window.test = data.test;
                var dim1=""
                var dim2=""
                var dim3=""
                var dim4=""
                var resultado1 = document.getElementById("resultado1")
                var resultado2 = document.getElementById("resultado2")
                var resultado3 = document.getElementById("resultado3")
                var resultado4 = document.getElementById("resultado4")
                var Chartgrafico = {
                    type: "bar",
                    data: {
                        datasets: [{
                            data: [data.test_result.result.A,data.test_result.result.B,data.test_result.result.C,data.test_result.result.D],
                            backgroundColor: [
                                '#0e2f57', '#0870bc', '#08bcff', '#08bccf',
                            ],
                        }],
                        labels: [
                            "Respuestas A", "Respuestas B", "Respuestas C", "Respuestas D",
                        ]
                    },
                    options: {
                        responsive: true, 
                        plugins: {
                            legend: {
                                display: false
                                }
                            }
                        }
                }

                var grafica = document.getElementById('chart');
                window.pie = new Chart(grafica, Chartgrafico);                              
                                                              
                if (data.test_result) {
                    
                    var resultado = data.test_result.result.strQuadrantH 
                    if(resultado.includes("Logico-Matemático")){
                        var cohorte1= "Auditivo";
                        var cohorte2= "sindatos";
                        var nombre = "Auditivo";
                        console.log(cohorte1)
                        console.log(cohorte2)
                    }
                    if(resultado.includes("Organizado-Analista")){
                        var cohorte1= "Visual";
                        var cohorte2= "sindatos";
                        var nombre = "Visual";
                        console.log(cohorte1)
                        console.log(cohorte2)
                    }
                    if(resultado.includes("Organizado-Analista")){
                        var cohorte1= "Kinestetico";
                        var cohorte2= "sindatos";
                        var nombre = "Kinestetico";
                        console.log(cohorte1)
                        console.log(cohorte2)
                    }
                    if(resultado.includes("Intuitivo-Imaginativo")){
                        var cohorte1= "Auditivo";
                        var cohorte2= "Visual";
                        var nombre = "Visual y Auditivo";
                        console.log(cohorte1)
                        console.log(cohorte2)
                    }
                    resultadotext = resultado.replaceAll("<br>","").split(" ")
                    console.log(resultado)                    
                    dim1=data.test_result.result.A;//resultadotext[3]
                    dim2=data.test_result.result.B;//resultadotext[5]
                    dim3=data.test_result.result.C;//resultadotext[7]
                    dim4=data.test_result.result.D;//resultadotext[7]
                    resultado1.innerText=dim1
                    resultado2.innerText=dim2
                    resultado3.innerText=dim3
                    resultado4.innerText=dim4
                    console.table(data);
                    
                    

                    
                    $("#testresult").append('<p><br><b>' +resultadotext[0]+'</p>')
                    $("#cohorteasignacion").append('Has sido asignado al cohorte: '+resultadotext[0])
                    //'<br/>'+resultadotext[1]+'<br/>'+resultadotext[2]+'<br/>'+resultadotext[3]+'<br/>'+resultadotext[4]+'<br/>'+resultadotext[5]+'<br/>'+resultadotext[6]+'<br/>'+resultadotext[7]+'<br/>'+resultadotext[8]+'<br/>'+resultadotext[9]+'<br/>'+resultadotext[10]+'<br/>'+resultadotext[11]+'<br/>'+resultadotext[12]+'<br/>'+resultadotext[13]+'<br/>'+resultadotext[14]+'<br/>'+resultadotext[15]+'<br/>'+resultadotext[16]+'<br/>'+resultadotext[17]+'<br/>'+'</p>')
                                   
                    var options = {
                        responsive: false,
                        maintainAspectRatio: true,
                        scale: {
                            max: 3,
                            min: 0,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    };

                }
            }
        });

        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: "null",
            dataType: 'json',
            success: function(data){
                window.test = data.test;
                console.table(data)
                var recursos=""
                setTimeout(function(){                    
                    for(k=0; k<(data.length); k++){                                
                        if((data[k].tag==recursoLoad1)||(data[k].tag==recursoLoad2)){
                            recursos=recursos+data[k].resource+'<br>';                            
                            console.log(data[k].resource)
                        }
                    }                    
                    var resources_list = document.getElementById('recursoscohorte')
                    resources_list.innerHTML = ''

                    tag_estudiante = tag.split("-")
                    
                    resources_list.innerHTML = "<b>Repositorio </b><br>"+recursos
                },100)
                
            }
        });


    });
}

document.getElementById("btnVistaMaestro").addEventListener("click",function(){
    window.location.href="/scenario/adaptive_test.0/vista_reglas_maestro/"+window.location.search;
});
