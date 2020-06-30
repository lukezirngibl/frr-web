"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styles_1 = require("@material-ui/core/styles");
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var clsx_1 = __importDefault(require("clsx"));
var react_1 = __importDefault(require("react"));
var react_virtualized_1 = require("react-virtualized");
var styles = function (theme) {
    return styles_1.createStyles({
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
        },
        table: {
            // temporary right-to-left patch, waiting for
            // https://github.com/bvaughn/react-virtualized/issues/454
            '& .ReactVirtualized__Table__headerRow': {
                flip: false,
                paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
            },
        },
        tableRow: {
            cursor: 'pointer',
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
            },
        },
        tableCell: {
            flex: 1,
        },
        noClick: {
            cursor: 'initial',
        },
    });
};
var InnerTable = function (props) {
    var getRowClassName = function (row) {
        var _a;
        var index = row.index;
        return clsx_1.default(props.classes.tableRow, classes.flexContainer, (_a = {},
            _a[props.classes.tableRowHover] = index !== -1 && props.onRowClick !== null,
            _a));
    };
    var cellRenderer = function (cell) {
        var _a;
        var cellData = cell.cellData, columnIndex = cell.columnIndex;
        return (react_1.default.createElement(TableCell_1.default, { component: "div", className: clsx_1.default(classes.tableCell, classes.flexContainer, (_a = {},
                _a[classes.noClick] = props.onRowClick === null,
                _a)), variant: "body", onClick: function () {
                if (props.onRowClick) {
                    props.onRowClick(cell.rowData);
                }
                // this.props.setDetailId(some(`${cell.rowData.id}-${cell.rowData.app}`))
            }, style: {
                height: 48,
                backgroundColor: cell.rowData.status === 'Order Confirmed' ? '#e9f7ec' : 'white',
            }, align: (columnIndex !== null && columns[columnIndex].numeric) || false
                ? 'right'
                : 'left' }, props.renderCell({
            rowData: cell.rowData,
            index: columnIndex,
            value: cellData,
        })));
    };
    var headerRenderer = function (_a) {
        var label = _a.label, columnIndex = _a.columnIndex;
        return (react_1.default.createElement(TableCell_1.default, { component: "div", className: clsx_1.default(props.classes.tableCell, props.classes.flexContainer, props.classes.noClick), variant: "head", style: { height: 48, borderBottomColor: 'rgb(243,243,245)' }, align: columns[columnIndex].numeric || false ? 'right' : 'left' },
            react_1.default.createElement("span", null, label)));
    };
    var classes = props.classes, columns = props.columns, data = props.data, tableProps = __rest(props, ["classes", "columns", "data"]);
    return (react_1.default.createElement(react_virtualized_1.AutoSizer, null, function (_a) {
        var height = _a.height, width = _a.width;
        return (react_1.default.createElement(react_virtualized_1.Table, __assign({ rowCount: data.length, height: height, width: width, rowHeight: 48, gridStyle: {
                direction: 'inherit',
            }, headerHeight: 48, className: classes.table }, tableProps, { rowGetter: function (_a) {
                var index = _a.index;
                return data[index];
            }, onRowClick: undefined, rowClassName: getRowClassName }), columns.map(function (_a, index) {
            var dataKey = _a.dataKey, other = __rest(_a, ["dataKey"]);
            return (react_1.default.createElement(react_virtualized_1.Column, __assign({ key: dataKey, headerRenderer: function (headerProps) {
                    return headerRenderer(__assign(__assign({}, headerProps), { columnIndex: index }));
                }, className: classes.flexContainer, cellRenderer: cellRenderer, dataKey: dataKey }, other)));
        })));
    }));
};
var InnerTableWithStyles = styles_1.withStyles(styles)(InnerTable);
exports.Table = function (props) {
    return react_1.default.createElement(InnerTableWithStyles, __assign({}, props));
};
//# sourceMappingURL=Table.js.map