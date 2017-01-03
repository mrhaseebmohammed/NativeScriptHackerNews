var vmModule = require("./main-view-model");
var utilityModule = require("utils/utils");
var LabelModule = require("ui/label");

function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel.get("selectedItem");
    
}
exports.pageNavigatedTo = pageNavigatedTo;

exports.launch = function(args) {
    if(args.object.url)
    {
        utilityModule.openUrl(args.object.url);
        var lbl = new LabelModule.Label();
        lbl.id = "title";
        console.log(lbl);
    }
}