import React, { useState, useEffect } from "react";
import Snap from "snapsvg-cjs";
import $ from "jquery";
import classes from "./Analytics.module.css";

export default function Analytics() {
  useEffect(() => {
    var i;
    var price = [0, -95, -30, -65, -35, -215, -95, -70, -115];
    //CHART VALUES
    var chartH = 550; //$("#svg").height();
    var chartW = 600; //$("#svg").width();

    // PARSE PRICES TO ALIGN WITH BOTTOM OF OUR SVG
    var prices = [];
    for (i = 0; i < price.length; i++) {
      prices[i] = price[i] + 550; //$("#svg").height();
    }

    function draw() {
      //DEFINE SNAP SVG AND DETERMINE STEP NO.
      var paper = Snap("#svg");
      var steps = prices.length;

      // EVENLY DISTRIBUTE OUR POINTS ALONG THE X AXIS

      function step(i, chartW) {
        return (chartW / prices.length) * i;
      }

      var points = [];
      var breakPointsX = [];
      var breakPointsY = [];
      var point = {};

      for (i = 1; i < prices.length; i++) {
        //CALCULATE CURRENT POINT

        var currStep = step(i, chartW);
        var y = prices[i];
        point.x = Math.floor(currStep);
        point.y = y;

        //CALCULATE PREVIOUS POINT

        var prev = i - 1;
        var prevStep = step(prev, chartW);
        var prevY = prices[prev];
        point.prevX = Math.floor(prevStep);
        point.prevY = prevY;
        if (point.prevX === 0 || point.prevY === 0) {
          point.prevX = 15;
          point.prevY = chartH - 15;
        }
        // SAVE PATH TO ARRAY
        points[i] =
          " M" +
          point.prevX +
          "," +
          point.prevY +
          " L" +
          point.x +
          "," +
          point.y;

        // SAVE BREAKPOINTS POSITION

        var r = 30;
        breakPointsX[i] = point.x;
        breakPointsY[i] = point.y;
      }

      // DRAW LINES

      for (i = 0; i < points.length; i++) {
        var myPath = paper.path(points[i]);
        var len = myPath.getTotalLength();
        myPath.attr({
          "stroke-dasharray": len,
          "stroke-dashoffset": len,
          stroke: "white",
          "stroke-linecap": "round",
          "stroke-width": 10,
          "stroke-linejoin": "round",
          id: "myLine" + i,
          class: "line",
        });
      }
      // DRAW BREAKPOINTS
      for (i = 0; i < points.length; i++) {
        var circle = paper.circle(breakPointsX[i], breakPointsY[i], 5);
        circle.attr({
          fill: "#FF4864",
          stroke: "white",
          "stroke-width": 3,
          id: "myCirc" + i,
          class: "breakpoint",
        });
      }
      // DRAW COORDINATE SYSTEM
      var xAxis = paper.path("M0," + chartH + "L" + chartW + "," + chartH);
      var yAxis = paper.path("M0," + chartH + "L0,0");

      var xOff = xAxis.getTotalLength();
      var yOff = yAxis.getTotalLength();
      var start = prices.length * 250 + "ms";

      yAxis.attr({
        stroke: "white",
        "stroke-width": 10,
        "stroke-dasharray": yOff,
        "stroke-dashoffset": yOff,
        id: "yAxis",
      });
      xAxis.attr({
        stroke: "white",
        "stroke-width": 10,
        "stroke-dasharray": xOff,
        "stroke-dashoffset": xOff,
        id: "xAxis",
      });
      console.log(start);
      $("#yAxis").css({
        "-webkit-transition-delay": start,
        "-webkit-transition": "all 200ms ease-in",
      });
      $("#xAxis").css({
        "-webkit-transition-delay": start,
        "-webkit-transition": "all 200ms ease-in",
      });
      $("#xAxis").animate({
        "stroke-dashoffset": "0",
      });
      $("#yAxis").animate({
        "stroke-dashoffset": "0",
      });
    }
    function animate() {
      for (i = 0; i < prices.length; i++) {
        var circ = $("#myCirc" + i);
        var line = $("#myLine" + i);
        circ.css({
          "-webkit-transition": "all 550ms cubic-bezier(.84,0,.2,1)",
          "-webkit-transition-delay": 375 + i * 125 + "ms",
        });
        line.css({
          "-webkit-transition": "all 250ms cubic-bezier(.84,0,.2,1)",
          "-webkit-transition-delay": i * 125 + "ms",
        });
        line.animate({
          "stroke-dashoffset": 0,
        });
        circ.css({
          transform: "scale(1)",
        });
      }
    }

    draw();
    animate();

    var timer = setInterval(() => {
      $("#svg").empty();
      draw();
      animate();
    }, 2000);

    //

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className={classes.ana}>
      <svg id="svg" viewBox="0 0 600 600"></svg>
    </div>
  );
}
