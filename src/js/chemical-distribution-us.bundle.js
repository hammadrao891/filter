"use strict";(self.webpackChunkproject=self.webpackChunkproject||[]).push([["chemical-distribution-us"],{419:()=>{document.addEventListener("DOMContentLoaded",(()=>{e(),t()}));const e=()=>{const e=document.querySelectorAll(".collapsible");e.forEach((t=>{const o=t.querySelector(".title"),r=t.querySelector(".expandable-content"),c=o.querySelector(".arrow");o.addEventListener("click",(function(){const t=r.style.maxHeight;e.forEach((e=>{const t=e.querySelector(".expandable-content"),o=e.querySelector(".arrow");t.style.maxHeight=null,o.style.transform="rotate(180deg)"})),t?(r.style.maxHeight=null,c.style.transform="rotate(180deg)"):(r.style.maxHeight=r.scrollHeight+"px",c.style.transform="rotate(0deg)")}))}))},t=()=>{const e=document.querySelector(".table-rows"),t=e.querySelectorAll('input[type="checkbox"]'),o=e.querySelector('button[type="submit"]');function r(){const e=Array.from(t).some((e=>e.checked));o.disabled=!e}t.forEach((e=>{e.addEventListener("change",r)})),r()}}},e=>{e.O(0,["vendors/gsap-core","vendors/CSSPlugin"],(()=>(419,e(e.s=419)))),e.O()}]);