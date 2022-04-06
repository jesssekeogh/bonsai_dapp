
## Install
Assuming you have vessel package manager initialized.

1) Edit your package-set.dhall and in additions array add this object

        let additions = [
        { name = "anvil"
        , repo = "https://github.com/infu/anvil.mo"
        , version = "v0.1.2"
        , dependencies = ["base"]
        },
      
2) edit vessel.dhall and add new dependency "anvil" like so

        dependencies = [ "anvil",...
        
3) run 

        vessel install 
        
4) import it in your code with 
        
        import Cluster "mo:anvil/type/Cluster";
