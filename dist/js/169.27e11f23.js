"use strict";(self["webpackChunkvue3"]=self["webpackChunkvue3"]||[]).push([[169],{4321:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var s=n(9260),a=n(5127);const o=new Set,i=()=>new WeakSet;function h(t){if(t.done)return;s.aN.attach(this.outerObject3d),this.width=this.depth=Math.min(this.width,this.depth),this.physicsUpdate={};const e=(0,s.b9)(this).multiplyScalar(.5);this.bvhHalfHeight=Math.max(e.y,.5),this.bvhRadius=Math.max(e.x,.5),this.bvhVelocity=new s.V,o.add(this),t.then((()=>{o.delete(this),this.physicsUpdate=void 0}))}(0,s.aZ)((function(){if((0,s.b1)())return;const t=(0,s.a_)();if(!t.length)return;const e=(0,s.a$)(),n=(0,s.b0)(),h=.02,c=(0,s.b2)((()=>{s.b3.clear();for(const c of o){const o=c.bvhVelocity,d=c.outerObject3d,r=c.bvhHalfHeight,b=c.bvhRadius;o.y+=c.bvhOnGround?0:h*-e;const{position:u}=c.physicsUpdate;c.physicsUpdate={},u&&(u.x&&(o.x=0),u.y&&(o.y=0),u.z&&(o.z=0)),d.position.addScaledVector(o,h),d.updateMatrixWorld();const{start:l,end:p}=s.b6;p.copy(l.copy(d.position));const y=Math.max(r-b,0);p.y+=y,l.y-=y;const f=l.clone();s.b4.setFromCenterAndSize(d.position,s.b5.set(2*b,2*r,2*b));const v=s.b7,m=s.b8;let x,S,M=0,O=!1;for(const e of t)S=a.b.get(e),e.shapecast({intersectsBounds:t=>t.intersectsBox(s.b4),intersectsTriangle:t=>{M=t.closestPointToSegment(s.b6,v,m),M<b&&(O=!0,x=m.sub(v).normalize().multiplyScalar(b-M),l.add(x),p.add(x))}});O&&S&&(0,s.Z)(s.b3,c,i).add(S);const g=l.sub(f);c.bvhOnGround=g.y>Math.abs(h*o.y*.25),n&&c.bvhOnGround&&Math.abs(g.y/(g.x+g.z+Number.EPSILON))<n&&(c.bvhOnGround=!1);const w=Math.max(0,g.length()-1e-5);g.normalize().multiplyScalar(w),d.position.add(g),c.bvhOnGround?o.set(0,0,0):(g.normalize(),o.addScaledVector(g,-g.dot(o)))}}));return()=>{c.cancel()}}),[s.a_,s.a$,s.b0,s.b1])}}]);
//# sourceMappingURL=169.27e11f23.js.map