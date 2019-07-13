import React, { Component } from 'react';
import * as d3 from "d3";
import "./style.css";

class TreeView extends Component {

    componentDidMount() {
        this.drawChart(this.buildData());
    }

    buildData = () => {
        const { data } = this.props; 
        let nodes = [];
        const root = {};
        nodes.push(data);
        const nameToNode = {};
        let outputRootNode = null;
        while (nodes.length > 0) {
            const node = nodes.pop();
            if (node.childMessages && node.childMessages.length > 0) {
                nodes = nodes.concat(node.childMessages.map(child => ({...child, parent: node})));
            }
            const parent = node.parent ? node.parent.requestMessage.msgId: null;
            const outputNode = {
                name: node.requestMessage.msgId,
                parent,
                requestMessage: node.requestMessage,
                replyMessage: node.replyMessage,
                children: [],
            };
            if (outputRootNode === null) {
                outputRootNode = outputNode;
            }
            nameToNode[outputNode.name] = outputNode;
            if (parent !== null) {
                const outputNodeParent = nameToNode[parent];
                if (outputNodeParent) {
                    outputNodeParent.children.push(outputNode);
                }
            }
        }
        return [outputRootNode];
    }

    drawChart = treeData => {
        const { onClickNode } = this.props;
        const margin = { top: 20, right: 120, bottom: 20, left: 200 },
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;

            let i = 0,
            duration = 750,
            root;

            const tree = d3.layout.tree()
            .size([height, width]);

            const diagonal = d3.svg.diagonal()
            .projection(function (d) { return [d.y, d.x]; });

            const svg = d3.select(this.refs.tree).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        root = treeData[0];
        root.x0 = height / 2;
        root.y0 = 0;
        var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 1e-6);
        update(root);

        // d3.select(self.frameElement).style("height", "500px");

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click)
                .on("mouseover", mouseover)
                .on("mousemove", function(d){mousemove(d);})
                .on("mouseout", mouseout)
            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", d => d._children ? "lightsteelblue" : "#fff")
                .style("stroke", d => d.replyMessage.status.code === 0 ? "#00ff00": "#ff0000");

            nodeEnter.append("text")
                .attr("x", function (d) { return d.children || d._children ? -13 : 13; })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                .text(function (d) { return d.requestMessage.operation; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 10)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            
            // if (d.children) {
            //     d._children = d.children;
            //     d.children = null;
            // } else {
            //     d.children = d._children;
            //     d._children = null;
            // }
            // update(d);
            hideTooltip(d);
            onClickNode(d);
        }

        function mouseover() {
            div.transition()
            .duration(300)
            .style("opacity", 1);
        }

        function mousemove(d) {
            const { operation, timestamp: requestTimestamp } = d.requestMessage;
            const { status, timestamp: replyTimestamp } = d.replyMessage;
            let html = "<table><thead></thead><tbody>";
            const props = [
                { name: "Operation", value: operation }, 
                { name: "Status", value: status.code },
                { name: "Request Timestamp", value: requestTimestamp },
                { name: "Response Timestamp", value: replyTimestamp }];
            props.forEach(prop => {
                html += "<tr><td>" + prop.name + "</td><td>" + prop.value + "</td></tr>"
            })
            html += "</tbody></table>";
            div
            .html(html)
            .style("left", (d3.event.pageX ) + "px")
            .style("top", (d3.event.pageY) + "px");
        }
        function hideTooltip() {
            div.transition()
            .duration(300)
            .style("opacity", 1e-6);
        }
        function mouseout() {
            hideTooltip();
        }
    }

    render() {
        return (<div ref="tree"></div>);
    }

}

export default TreeView;