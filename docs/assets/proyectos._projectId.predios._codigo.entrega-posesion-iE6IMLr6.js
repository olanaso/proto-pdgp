import{t as e}from"./link-BIRbrmIR.js";import{t}from"./jsx-runtime-DKdBMi_L.js";import{X as n}from"./PredioEncabezado-DB81o3My.js";import{t as r}from"./Aviso-Beu6EHWG.js";import{f as i,l as a,m as o,p as s,s as c,u as l}from"./archivosIdb-9W87R32_.js";import{k as u}from"./index-BVFt4EOu.js";import{t as d}from"./PredioSimpleForm-SQu0Y4eZ.js";var f=t(),p=`entrega-posesion`,m=[`desocupacion_libre`,`desocupacion_ocupado`,`desocupacion_actividad`];function h(e){let t=n(e);if(t===`estatal`)return{clave:`entrega_estatal`,desde:`resolución de la SBN`};if(t===`bloque`)return{clave:`bloque_entrega`,desde:`aceptación de la carta del bloque`};if(t===`mejoras`)return{clave:e.ocupado?`desocupacion_ocupado`:`desocupacion_libre`,desde:`pago o consignación de las mejoras`};let r=e.ruta===`EXPROPIACION`?`notificación de la consignación`:`pago`;return e.actividad===`INDUSTRIA_COMERCIO`?{clave:`desocupacion_actividad`,desde:r,tope:120}:{clave:e.ocupado?`desocupacion_ocupado`:`desocupacion_libre`,desde:r,tope:60}}var g=e=>Number(e)||0;function _({perfil:e,hitos:t,values:n}){let{clave:r,tope:a}=h(e),o=s(t[r]?.fecha);if(!o)return;let c=l(r);return i(o,{...c,dias:c.dias+(a?g(n.prorroga):0)})}var v=e=>{let{clave:t,desde:n,tope:r}=h(e.perfil),i=l(t),a=e.hitos[t],s=a&&a.pantalla!==p?a:void 0;return[{title:`Plazo de entrega`,fields:[{key:`inicioDeOtra`,label:`Inicio del plazo (${n})`,type:`calculado`,visible:()=>!!s,ayuda:s?`Registrado en ${s.campo}.`:void 0,calcular:()=>o(s?.fecha)},{key:`fechaInicioPlazo`,label:`Inicio del plazo (${n})`,type:`date`,hito:t,visible:()=>!s},{key:`plazoBase`,label:`Plazo legal`,type:`calculado`,calcular:()=>`${i.dias} d.h. · ${i.nombre} · art. ${i.articulo}`},{key:`prorroga`,label:`Prórroga por acuerdo (d.h.)`,type:`number`,visible:()=>r!==void 0,ayuda:`Art. 31: el plazo total con prórroga no supera ${r} d.h.`},{key:`acuerdoProrroga`,label:`Acuerdo de prórroga`,type:`file`,accept:`.pdf`,fullWidth:!0,visible:e=>r!==void 0&&g(e.values.prorroga)>0},{key:`venceTotal`,label:`Vencimiento de la entrega`,type:`calculado`,calcular:e=>{let t=_(e);return t?o(t):`Registre el inicio del plazo`}}]},{title:`Datos de entrega`,fields:[{key:`fechaEntrega`,label:`Fecha de entrega`,type:`date`,required:!0},{key:`estadoLiberacion`,label:`Estado de liberación`,type:`select`,options:[`PENDIENTE`,`PARCIALMENTE LIBERADO`,`LIBERADO`,`OBSERVADO`],required:!0},{key:`acta`,label:`Acta de entrega`,type:`file`,accept:`.pdf,.doc,.docx`,fullWidth:!0},{key:`observaciones`,label:`Observaciones`,type:`textarea`,fullWidth:!0},{key:`fotos`,label:`Fotos del acta`,type:`foto`,fullWidth:!0}]}]};function y(){let{projectId:t,codigo:n}=u.useParams();return(0,f.jsx)(d,{modulo:16,projectId:t,codigo:n,title:`Entrega de posesión`,paso:p,sections:v,validar:({perfil:e,values:t})=>{let{clave:n,tope:r}=h(e);return r&&l(n).dias+g(t.prorroga)>r?`Con la prórroga el plazo supera el tope de ${r} d.h. (art. 31).`:null},alGuardar:({perfil:e,hitos:t,codigo:n})=>{let r=h(e).clave;for(let e of m)e!==r&&t[e]?.pantalla===p&&c(n,e,``,p,``)},antesDelFormulario:n=>{let i=_(n);return i&&a(i)<0&&!n.values.fechaEntrega?(0,f.jsxs)(r,{tipo:`error`,children:[`El plazo de entrega venció el `,o(i),` sin acta. Corresponde la ejecución coactiva (Título V).`,` `,(0,f.jsx)(e,{to:`/proyectos/$projectId/predios/$codigo/ejecucion-coactiva`,params:{projectId:t,codigo:n.codigo},className:`font-semibold underline`,children:`Ir a Ejecución coactiva`})]}):null},documento:{titulo:`Generar acta de entrega de posesión`,tipos:[`acta`],subtipos:{acta:`ac-posesion`},destino:({predio:e})=>({externo:e?.suj||``}),asunto:({predio:e,decodedCodigo:t})=>`Entrega de posesión del predio ${e?.cod||t}`,nombreArchivo:({predio:e,decodedCodigo:t})=>`acta_entrega_posesion_${(e?.cod||t).replace(/[^A-Z0-9-]/gi,``).toUpperCase()}.doc`,armarArchivo:(e,t,n)=>b(e,n)}})}function b(e,{values:t,decodedCodigo:n,projectLabel:r,predio:i}){return x({numero:e,fechaEntrega:t.fechaEntrega,estadoLiberacion:t.estadoLiberacion,observaciones:t.observaciones,predio:i,predioCode:i?.cod||n,projectLabel:r})}function x({numero:e,fechaEntrega:t,estadoLiberacion:n,observaciones:r,predio:i,predioCode:a,projectLabel:o}){let s=S(t),c=i?.rlegal||i?.rtec||`Representante de la DDP`,l=i?.suj||`Sujeto pasivo pendiente de identificar`,u=`<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta charset="UTF-8" />
    <title>Acta de entrega de posesión</title>
    <style>
      @page { size: A4; margin: 2cm 2.2cm; }
      body { font-family: Arial, sans-serif; color: rgb(17, 24, 39); font-size: 10.5pt; line-height: 1.5; }
      h1 { margin: 18px 0 4px; text-align: center; font-size: 15pt; }
      h2 { margin: 18px 0 8px; border-bottom: 1px solid rgb(200, 16, 46); padding-bottom: 4px; color: rgb(139, 26, 26); font-size: 11pt; }
      p { margin: 8px 0; text-align: justify; }
      .institution, .subtitle { text-align: center; }
      .institution { font-size: 9pt; font-weight: bold; }
      .subtitle { margin-bottom: 20px; font-size: 9pt; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; }
      th, td { border: 1px solid rgb(209, 213, 219); padding: 6px 8px; vertical-align: top; }
      th { width: 31%; background: rgb(243, 244, 246); text-align: left; }
      .signatures td { height: 90px; border: 0; padding: 50px 18px 0; text-align: center; vertical-align: bottom; }
      .signature-line { border-top: 1px solid rgb(17, 24, 39); padding-top: 5px; }
      .footer { margin-top: 24px; color: rgb(75, 85, 99); text-align: center; font-size: 8pt; }
    </style>
  </head>
  <body>
    <div class="institution">MINISTERIO DE TRANSPORTES Y COMUNICACIONES</div>
    <h1>ACTA DE ENTREGA DE POSESIÓN</h1>
    <div class="subtitle"><b>${w(e??`BORRADOR SIN NUMERAR`)}</b> · Predio ${w(a)}</div>

    <p>
      En la fecha ${w(s)}, se deja constancia de la entrega de posesión
      del predio identificado con código <b>${w(a)}</b>, correspondiente al
      proyecto <b>${w(o)}</b>, de acuerdo con la información y condiciones
      detalladas en la presente acta.
    </p>

    <h2>1. Identificación del predio</h2>
    <table>
      <tr><th>Proyecto</th><td>${w(o)}</td></tr>
      <tr><th>Código de predio</th><td>${w(a)}</td></tr>
      <tr><th>Expediente</th><td>${w(i?.exp||`No consignado`)}</td></tr>
      <tr><th>Sujeto pasivo</th><td>${w(l)}</td></tr>
      <tr><th>Partida registral</th><td>${w(i?.part||i?.pind||`No consignada`)}</td></tr>
      <tr><th>Área afectada</th><td>${w(i?.area||i?.m2||`Por verificar`)} m²</td></tr>
      <tr><th>Ubicación</th><td>${w(i?.ciudad||`No consignada`)}</td></tr>
    </table>

    <h2>2. Condiciones de la entrega</h2>
    <table>
      <tr><th>Fecha de entrega</th><td>${w(s)}</td></tr>
      <tr><th>Estado de liberación</th><td>${w(n||`Pendiente de verificar`)}</td></tr>
      <tr><th>Observaciones</th><td>${w(r||`Sin observaciones registradas`)}</td></tr>
    </table>

    <h2>3. Declaración de entrega</h2>
    <p>
      La parte entregante manifiesta que pone el predio descrito a disposición de la Dirección de
      Disponibilidad de Predios, en el estado físico y de ocupación consignado en esta acta. La parte
      receptora declara recibir la posesión para la continuidad de las acciones relacionadas con el
      proyecto, sin perjuicio de las verificaciones técnicas y legales que correspondan.
    </p>

    <h2>4. Conformidad</h2>
    <p>
      Leído el contenido del presente borrador, las partes podrán completar las precisiones necesarias
      antes de su impresión y suscripción definitiva.
    </p>

    <table class="signatures">
      <tr>
        <td><div class="signature-line"><b>${w(l)}</b><br />Parte entregante</div></td>
        <td><div class="signature-line"><b>${w(c)}</b><br />Representante DDP / parte receptora</div></td>
      </tr>
    </table>

    <div class="footer">Borrador generado el ${w(C())} por el Sistema de Gestión Predial.</div>
  </body>
</html>`;return new Blob([`﻿`,u],{type:`application/msword;charset=utf-8`})}function S(e){if(!e)return`No consignada`;let[t,n,r]=e.split(`-`);return t&&n&&r?`${r}/${n}/${t}`:e}function C(){return new Intl.DateTimeFormat(`es-PE`,{day:`2-digit`,month:`2-digit`,year:`numeric`,timeZone:`America/Lima`}).format(new Date)}function w(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}export{y as component};