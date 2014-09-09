/**
  @author Daniel Abad

  Implements a hyperbolic layout, the algorithm is based on JONH LAMPING AND RAMANA RAO
  The class is based on David Piegza's force-directed layout
  https://github.com/davidpiegza/Graph-Visualization/blob/master/Graph.js

  Parameters:
  graph - data structure
  options = {
    layout: "2d"
    attraction: <float>, attraction value for force-directed layout
    repulsion: <float>, repulsion value for force-directed layout
    iterations: <int>, maximum number of iterations
    width: <int>, width of the viewport
    height: <int>, height of the viewport 

    positionUpdated: <function>, called when the position of the node has been updated
  }
  
  Examples:
  
  create:
  layout = new Layout.Hyperbolic(graph, {width: 2000, height: 2000, iterations: 1000, layout: "3d"});
  
  call init when graph is loaded (and for reset or when new nodes has been added to the graph):
  layout.init();
  
  call generate in a render method, returns true if it's still calculating and false if it's finished
  layout.generate();
 */

var Layout = Layout || {};
var math = mathjs();

Layout.Hyperbolic = function(graph, options) {
  var options = options || {};
  this.max_iterations = options.iterations || 1000;
  this.graph = graph;
  this.width = options.width || 200;
  this.height = options.height || 200;
  this.finished = false;
 
  var layout_iterations = 0;
  
  // performance test
  var mean_time = 0;

  /**
   * Transformation of a point
   */
  function transformation(z,p,theta){
    //z,p,theta are complex numbers
    var num = math.add(math.multiply(theta,z),p);
    var den = math.add(1,math.multiply(math.multiply(math.conj(p),theta),z))
    var zz = math.divide(num,den);
    return zz;
  };

   /**
   * Inversion of a transformation of a point
   */
  function inversetransformation(z,p,theta){
    var p0,t0;
    return transformation(z,p0,t0);
  };

   /**
   * Composition of two transformations
   */
  function composition(z,p1,t1,p2,t2){
    var p0,t0;
    return transformation(z,p0,t0);
  };

  function distance(s,a){
    var sum1 = math.sqrt((Math.pow((4/2),2))+5);
    var sum2 = 0;
    return 0;
  }

  function subangle(angle,numberOfChildren){
    return angle / numberOfChildren;
  }

  function subangleLogarithm(angle,node){
    return 0;
  }

  function drawWedge(node,angle,sons){

  }

  /**
   * Initialize parameters used by the algorithm.
   * TO DELETE
   */
  this.init = function() {};

  /**
   * Generates the force-directed layout.
   *
   * It finishes when the number of max_iterations has been reached or when
   * the temperature is nearly zero.
   */
  this.generate = function() {
    if(layout_iterations < 1) {
      var angle = subangle(2*math.pi,graph.nodes[0].nodesTo.length)
      layout_iterations++;

      graph.nodes[0].position.x = 0;
      graph.nodes[0].position.y = 0;
      var a = math.complex({re:1,im:0})
      var trans = math.complex({r:1,phi:angle})

      for(var i=0; i < graph.nodes[0].nodesTo.length; i++) {
        console.log(graph.nodes[0].nodesTo[i]);
        console.log(a = math.multiply(a,trans));        
        graph.nodes[0].nodesTo[i].position.x = 1000*a.re;
        graph.nodes[0].nodesTo[i].position.y = 1000*a.im;
      }
    
    } else {
        this.finished = true;
      return false;
    }
    return true;
  };

  /**
   * Stops the calculation by setting the current_iterations to max_iterations.
   */
  this.stop_calculating = function() {
    layout_iterations = this.max_iterations;
  }
};
