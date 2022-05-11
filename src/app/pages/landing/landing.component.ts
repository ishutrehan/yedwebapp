import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import ScrollTrigger from "gsap/ScrollTrigger";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
 
  constructor(private router: Router) { 

  }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // don't forget to register plugins
    gsap.registerPlugin(ScrollTrigger, Draggable);
    
    this.initScrollTriggers();
  }
  goToLink(link:any){
    if(link == 'listings')
    window.location.href = 'listings';
    else
      this.router.navigate([link]);
  }
  initScrollTriggers() {
    document.querySelectorAll(".content-animation").forEach(box => {
      const scrollBox = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          start: "20px 80%",
          end: "bottom bottom",
          toggleActions: "play none, none, none"
        }
      });
      scrollBox.from(box, { y: 30, opacity: 0, duration: 1, rotation: 45 });
    });
  }
  
}
