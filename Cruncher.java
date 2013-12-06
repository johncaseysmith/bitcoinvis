class Cruncher {
  
  public static double[] crunch(double[] x,double[] y, String[] inputs, String[] outputs){
    
    //error check
    if(x.length!=inputs.length || y.length!=outputs.length){
      System.out.println("CHECK YOUR ENTRIES (length of arrays don't match somewhere)");
      System.exit(0);
    }
    
    double[] z = new double[x.length * y.length];
    
    //SUMS
    //     sum X
    double sumX = 0;
    for (int i=0;i<x.length;i++){
      sumX = sumX + x[i];
    }
    sumX = sumX;
    //sumX = sumX/100000000;
    System.out.println("Sum of x: " + sumX);
    //     sum Y
    double sumY = 0;
    for (int i=0;i<y.length;i++){
      sumY = sumY + y[i];
    }
    sumY = sumY;
    //sumY = sumY/100000000;
    System.out.println("Sum of y: " + sumY);
    
    if(sumX==sumY){System.out.println("Inputs/outputs all balance!");} else {System.out.println("This doesn't balance! :(");}
      
      int a = 0; //current index within the new array z, used within forloops
      
      for (int i=0;i<x.length;i++){
        for (int m=0;m<y.length;m++){
          z[a] = ((x[i]/sumX)*(y[m]));
          //z[a] = ((x[i]/sumX)/100000000)*(y[m]/100000000);
          a++;
        }
      }
    
    return z;
  }
  
  //prints the "nodes" array .json code
  public static String printNodes(String[] inputs,String[] out,int x,int y){
    String base = new String("{\"nodes\":[\n");
      String end = base;
      String addy;
      
      //concat inputs
      for (int j=0;j<x;j++){
        addy = "{\"name\":\"" + inputs[j] + "\"},\n";
        end+=addy;
      } //concat outputs
      for (int j=0;j<y;j++){
        addy = "{\"name\":\"" + out[j] + "\"},\n";
        end+=addy;
      }
      
      end = end.substring(0, end.length() - 2);
      
      //add final bracket
      end+="],\n";
      
      //out comes a .json
      return end;
  }
  
  public static String printLinks(String[] inputs,String[] out,int x,int y, double[] z){
    String base = new String("\"links\":[\n");
      String end = base;
      String addy;
      
      //concat inputs
      int a = 0;
      for (int j=0;j<x;j++){
        for (int k=0;k<y;k++){
          //MULTIPLE TRANSACTIONS: Change addition to fit. Number = number of nodes present.
          //Add -1 to offset for the "cloned" origAddress.
          addy = "{\"source\":" + (j+0) + ",\"target\":" + (k+x+0-0) + ",\"value\":" + z[a] + "},\n";
          end+=addy;
          a++;
        }
      }
      
      end = end.substring(0, end.length() - 2);
      
      //add final bracket
      end+="\n]}";
      
      //out comes a .json
      return end;
  }
  
  /*
   * NOTE: Use this cruncher PER TRANSACTION. When you treat the nodes printout, just fix the brackets later.
   * */
  public static void main(String[] args){
    
    //This is everything you need.
    // {.0,.0} {"",""}
    //WHAT'S THE CURRENT ADDRESS? : 6GNt
    double[] x = new double[]{10000,13.3953};
    double[] y = new double[]{10000,13.1953};
    String[] inputs = new String[]{"yjMk","J6HZ"};
    String[] out = new String[]{"Asfb","ezPs"};
    
    double[] z = crunch(x,y,inputs,out);
    
    int a = 0;
    
    for(int i = 0; i<x.length; i++){
      for(int m = 0; m<y.length; m++){
        System.out.println((z[a]) + " from " + inputs[i] + " to " + out[m]);
        a++;
      }
    }
      System.out.println(printNodes(inputs,out,x.length,y.length));
      System.out.println(printLinks(inputs,out,x.length,y.length,z));
    
  }  
}
