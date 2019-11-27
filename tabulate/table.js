const coins = require('../condition/condition')

function rowHeight(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            //console.log(Math.max(max, cell.minHeight()))
            return Math.max(max, cell.minHeight())
        }, 0)
    })
}

function colWidth(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function(max, row) {
            //console.log(Math.max(max, row[i].minWidth()))
            return Math.max(max, row[i].minWidth())
        }, 0)
    })
}

module.exports.drawTable = function drawTable(rows) {
    console.log(rows[0])
    let heights = rowHeight(rows);
    let widths = colWidth(rows);
    console.log([heights, widths])

    function drawLine(blocks, lineNo) {
        return blocks.map(function(block) {
            return block[lineNo];
        }).join(" ")
    }

    function drawRow(row, rowNum) {
        let blocks = row.map(function(cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum])
        })
        return blocks[0].map(function(_, lineNo) {
            console.log(drawLine(blocks, lineNo))
            return drawLine(blocks, lineNo)
        }).join("\n")
    }
    return rows.map(drawRow).join("\n")
}

function repeat(string, times) {
    let result = "";
    for (let i = 0; i < times; i++)
        result += string;
    return result
}

function TextCell(text) {
    this.text = text.split("\n")
}
TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
        console.log(width, line.length)
        return Math.max(width, line.length);
    }, 0)
}

TextCell.prototype.minHeight = function() {
    return this.text.length
}

TextCell.prototype.draw = function(width, height) {
    let result = []
    for (let i = 0; i < height; i++) {
        let line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length))
    }
    console.log(result)
    return result
}

function UnderlinedCell(inner) {
    this.inner = inner
    console.log(this.inner)
}
UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth()
}
UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1
}
UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1)
        .concat([repeat("*", width)])
}

module.exports.dataTable = function dataTable(data) {
    let keys = Object.keys(data[0])
    let headers = keys.map(function(name) {
        console.log(new UnderlinedCell(new TextCell(name)))
        return new UnderlinedCell(new TextCell(name))
    })
    let body = data.map(function(row) {
            return keys.map(function(name) {
                //console.log( new TextCell(String(row[name])))
                return new TextCell(String(row[name]))
            })
        })
        //console.log([headers.concat(body)])
    return [headers].concat(body)
}

//console.log(drawTable(dataTable(MOUNTAINS)))