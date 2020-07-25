"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Popover_1 = __importDefault(require("@material-ui/core/Popover"));
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        typography: {
            padding: theme.spacing(2),
        },
    });
});
exports.SimplePopover = function (props) {
    var classes = useStyles();
    var _a = react_1.default.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
        if (props.onClose) {
            props.onClose();
        }
    };
    var open = Boolean(anchorEl);
    var id = open ? 'simple-popover' : undefined;
    return (react_1.default.createElement("div", { style: props.style },
        props.trigger({ onClick: handleClick }),
        react_1.default.createElement(Popover_1.default, { id: id, style: props.popOverStyle, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
            } }, props.render({ close: handleClose }))));
};
//# sourceMappingURL=PopOver.js.map