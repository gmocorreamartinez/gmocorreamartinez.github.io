/**
 * Projects Page Functionality
 * Maneja filtros, modales y animaciones de la página de proyectos
 */

// ===== CONFIGURACIÓN =====
const PROJECTS_CONFIG = {
    animationDelay: 100,
    filterDelay: 300,
    modalTransition: 300
};

// ===== DATOS DE PROYECTOS DETALLADOS =====
const PROJECT_DETAILS = {
    'threat-detection': {
        title: 'Sistema de Detección de Amenazas con IA',
        fullDescription: `
            <h4>Descripción Completa</h4>
            <p>Este proyecto representa una innovación significativa en la detección automatizada de amenazas cibernéticas. 
            Utilizando algoritmos avanzados de machine learning, el sistema es capaz de identificar patrones anómalos 
            en el tráfico de red que podrían indicar actividad maliciosa.</p>
            
            <h4>Arquitectura Técnica</h4>
            <ul>
                <li><strong>Ingesta de Datos:</strong> Apache Kafka para streaming en tiempo real</li>
                <li><strong>Procesamiento:</strong> TensorFlow con modelos LSTM y CNN</li>
                <li><strong>Almacenamiento:</strong> Elasticsearch para indexación rápida</li>
                <li><strong>Orquestación:</strong> Kubernetes para escalabilidad automática</li>
            </ul>
            
            <h4>Algoritmos Implementados</h4>
            <ul>
                <li>Detección de anomalías con Isolation Forest</li>
                <li>Clasificación de tráfico con Random Forest</li>
                <li>Análisis de secuencias con LSTM</li>
                <li>Clustering de comportamientos con K-means</li>
            </ul>
            
            <h4>Resultados de Rendimiento</h4>
            <ul>
                <li>Precisión: 96.3% en detección de malware</li>
                <li>Recall: 94.7% en ataques de red</li>
                <li>Latencia promedio: 2.8 segundos</li>
                <li>Throughput: 10M eventos/día</li>
            </ul>
        `,
        technologies: 'Python, TensorFlow, Scikit-learn, Apache Kafka, Elasticsearch, Docker, Kubernetes, PostgreSQL',
        metrics: 'Reduce falsos positivos en 85%, procesa 10M+ eventos diarios, precisión del 96%'
    },
    
    'incident-platform': {
        title: 'Plataforma de Respuesta a Incidentes Automatizada',
        fullDescription: `
            <h4>Descripción Completa</h4>
            <p>Plataforma integral diseñada para transformar la manera en que los equipos SOC manejan incidentes de seguridad. 
            La automatización inteligente reduce significativamente el tiempo de respuesta y mejora la consistencia 
            en la remediación de amenazas.</p>
            
            <h4>Módulos Principales</h4>
            <ul>
                <li><strong>Motor de Orquestación:</strong> Automatiza flujos de trabajo complejos</li>
                <li><strong>Análisis Forense:</strong> Recopilación automática de evidencia</li>
                <li><strong>Correlación de Eventos:</strong> Vincula incidentes relacionados</li>
                <li><strong>Reportería Ejecutiva:</strong> Dashboards para management</li>
            </ul>
            
            <h4>Integraciones</h4>
            <ul>
                <li>SIEM: Splunk, QRadar, Sentinel</li>
                <li>EDR: CrowdStrike, Carbon Black, SentinelOne</li>
                <li>Threat Intel: MISP, ThreatConnect, Anomali</li>
                <li>Comunicación: Slack, Teams, PagerDuty</li>
            </ul>
            
            <h4>Casos de Uso Automatizados</h4>
            <ul>
                <li>Contención automática de endpoints comprometidos</li>
                <li>Análisis de hash y URLs sospechosas</li>
                <li>Enriquecimiento de IoCs con threat intelligence</li>
                <li>Generación de reportes post-incidente</li>
            </ul>
        `,
        technologies: 'Java Spring Boot, React, PostgreSQL, Redis, RabbitMQ, Docker, MISP API, REST APIs',
        metrics: 'Automatiza 80% de respuestas L1, reduce tiempo de respuesta a 15 minutos'
    },
    
    'quantum-crypto': {
        title: 'Implementación de Criptografía Post-Cuántica',
        fullDescription: `
            <h4>Descripción Completa</h4>
            <p>Proyecto de investigación enfocado en preparar las organizaciones para la era post-cuántica. 
            Implementa y evalúa algoritmos criptográficos resistentes a ataques de computadoras cuánticas, 
            siguiendo los estándares NIST PQC.</p>
            
            <h4>Algoritmos Implementados</h4>
            <ul>
                <li><strong>Kyber:</strong> KEM para intercambio de claves</li>
                <li><strong>Dilithium:</strong> Firmas digitales</li>
                <li><strong>SPHINCS+:</strong> Firmas basadas en hash</li>
                <li><strong>BIKE:</strong> Códigos correctores de errores</li>
            </ul>
            
            <h4>Evaluación de Rendimiento</h4>
            <ul>
                <li>Benchmarks en AWS Nitro Enclaves</li>
                <li>Comparación con RSA/ECC tradicional</li>
                <li>Análisis de uso de memoria y CPU</li>
                <li>Impacto en latencia de red</li>
            </ul>
            
            <h4>Publicaciones y Reconocimientos</h4>
            <ul>
                <li>Paper en IEEE Security & Privacy 2024</li>
                <li>Presentación en RSA Conference</li>
                <li>500+ citaciones académicas</li>
                <li>Colaboración con NIST PQC team</li>
            </ul>
            
            <h4>Roadmap de Migración</h4>
            <ul>
                <li>Evaluación de riesgos cuánticos</li>
                <li>Selección de algoritmos por caso de uso</li>
                <li>Plan de migración híbrida</li>
                <li>Capacitación de equipos técnicos</li>
            </ul>
        `,
        technologies: 'C++, Python, OpenSSL, liboqs, AWS Nitro Enclaves, NIST PQC Libraries',
        metrics: 'Paper IEEE publicado, 500+ citaciones, implementación en 3 clouds principales'
    },
    
    'cloud-audit': {
        title: 'Herramienta de Auditoría de Seguridad en Cloud',
        fullDescription: `
            <h4>Descripción Completa</h4>
            <p>Herramienta comprehensiva para evaluar la postura de seguridad en entornos cloud multi-proveedor. 
            Automatiza la detección de misconfigurations y evalúa compliance con múltiples frameworks de seguridad.</p>
            
            <h4>Controles de Seguridad</h4>
            <ul>
                <li><strong>IAM:</strong> Políticas, roles, permisos excesivos</li>
                <li><strong>Network:</strong> Security groups, NACLs, VPN configs</li>
                <li><strong>Storage:</strong> Cifrado, buckets públicos, backups</li>
                <li><strong>Compute:</strong> Patching, configuraciones, monitoring</li>
            </ul>
            
            <h4>Frameworks de Compliance</h4>
            <ul>
                <li>SOC 2 Type II</li>
                <li>ISO 27001/27017</li>
                <li>GDPR (artículos técnicos)</li>
                <li>NIST Cybersecurity Framework</li>
                <li>CIS Controls v8</li>
            </ul>
            
            <h4>Características Avanzadas</h4>
            <ul>
                <li>Scan programados y on-demand</li>
                <li>Priorización basada en riesgo</li>
                <li>Integración con ticketing systems</li>
                <li>APIs para CI/CD integration</li>
                <li>Reportes ejecutivos customizables</li>
            </ul>
            
            <h4>Soporte Multi-Cloud</h4>
            <ul>
                <li><strong>AWS:</strong> 80+ servicios auditados</li>
                <li><strong>Azure:</strong> 60+ servicios cubiertos</li>
                <li><strong>GCP:</strong> 45+ productos evaluados</li>
            </ul>
        `,
        technologies: 'Python, Boto3, Azure SDK, Google Cloud SDK, Terraform, Jinja2, SQLite, FastAPI',
        metrics: 'Evalúa 200+ controles, soporta 3 cloud providers, 95% precisión en detección'
    },
    
    'security-dashboard': {
        title: 'Dashboard de Analytics de Seguridad',
        fullDescription: `
            <h4>Descripción Completa</h4>
            <p>Plataforma de visualización avanzada que proporciona insights accionables sobre la postura de seguridad 
            organizacional. Correlaciona datos de múltiples fuentes para ofrecer una vista unificada del riesgo cibernético.</p>
            
            <h4>Fuentes de Datos Integradas</h4>
            <ul>
                <li><strong>SIEM/SOAR:</strong> Splunk, QRadar, Phantom</li>
                <li><strong>Vulnerability Management:</strong> Nessus, Qualys, Rapid7</li>
                <li><strong>Threat Intelligence:</strong> MISP, AlienVault, ThreatConnect</li>
                <li><strong>Cloud Security:</strong> AWS GuardDuty, Azure Sentinel</li>
                <li><strong>Network:</strong> Firewalls, IDS/IPS, Network monitoring</li>
            </ul>
            
            <h4>Métricas y KPIs</h4>
            <ul>
                <li>Mean Time to Detection (MTTD)</li>
                <li>Mean Time to Response (MTTR)</li>
                <li>Security Score trending</li>
                <li>Threat landscape overview</li>
                <li>Compliance status dashboard</li>
            </ul>
            
            <h4>Capacidades de ML</h4>
            <ul>
                <li>Predicción de tendencias de ataques</li>
                <li>Scoring automático de riesgo</li>
                <li>Detección de anomalías en métricas</li>
                <li>Recomendaciones de priorización</li>
            </ul>
            
            <h4>Tipos de Usuario</h4>
            <ul>
                <li><strong>CISO:</strong> Executive dashboards y reportes</li>
                <li><strong>SOC Analysts:</strong> Operational views y alertas</li>
                <li><strong>Security Engineers:</strong> Technical metrics y trends</li>
                <li><strong>Management:</strong> Risk summaries y compliance</li>
            </ul>
        `,
        technologies: 'React, D3.js, Node.js, Express, InfluxDB, Grafana, Apache Spark, Elasticsearch',
        metrics: 'Correlaciona 50+ fuentes, 24/7 monitoreo, dashboards para 4 tipos de usuarios'
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    initProjectCards();
    initModal();
    console.log('✅ Projects page inicializada');
});

// ===== FILTROS DE PROYECTOS =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar proyectos
            const filterValue = button.getAttribute('data-filter');
            filterProjects(filterValue, projectCards);
            
            // Analytics tracking
            trackFilterUsage(filterValue);
        });
    });
}

function filterProjects(filterValue, projectCards) {
    projectCards.forEach((card, index) => {
        const categories = card.getAttribute('data-category').split(' ');
        const shouldShow = filterValue === 'all' || categories.includes(filterValue);
        
        if (shouldShow) {
            card.classList.remove('hidden');
            card.style.animationDelay = `${index * PROJECTS_CONFIG.animationDelay}ms`;
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== CONFIGURACIÓN DE TARJETAS =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Animación de entrada escalonada
        card.style.animationDelay = `${index * PROJECTS_CONFIG.animationDelay}ms`;
        
        // Efectos hover mejorados
        setupCardHoverEffects(card);
    });
}

function setupCardHoverEffects(card) {
    const projectIcon = card.querySelector('.project-icon');
    
    card.addEventListener('mouseenter', () => {
        if (projectIcon) {
            projectIcon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (projectIcon) {
            projectIcon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
}

// ===== SISTEMA DE MODALES =====
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalOverlay = modal;
    
    // Cerrar modal al hacer click en overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    const project = PROJECT_DETAILS[projectId];
    
    if (!project) {
        console.error('Proyecto no encontrado:', projectId);
        return;
    }
    
    // Actualizar contenido del modal
    modalTitle.textContent = project.title;
    modalBody.innerHTML = `
        ${project.fullDescription}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--glass-border);">
            <h4>Stack Tecnológico Completo</h4>
            <p style="background: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px; border: 1px solid var(--glass-border);">
                <strong>${project.technologies}</strong>
            </p>
            
            <h4>Métricas de Impacto</h4>
            <p style="background: rgba(52, 152, 219, 0.1); padding: 15px; border-radius: 8px; border: 1px solid rgba(52, 152, 219, 0.3); color: var(--text-secondary);">
                ${project.metrics}
            </p>
        </div>
    `;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Analytics
    trackModalOpen(projectId);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Limpiar contenido después de la animación
    setTimeout(() => {
        if (!modal.classList.contains('active')) {
            document.getElementById('modalBody').innerHTML = '';
        }
    }, PROJECTS_CONFIG.modalTransition);
}

// ===== ANALYTICS Y TRACKING =====
function trackFilterUsage(filterValue) {
    console.log(`📊 Filter used: ${filterValue}`);
    
    // Implementar tracking real aquí
    // Ejemplo: Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'filter_projects', {
            event_category: 'Projects',
            event_label: filterValue
        });
    }
}

function trackModalOpen(projectId) {
    console.log(`📊 Project modal opened: ${projectId}`);
    
    // Implementar tracking real aquí
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_project_details', {
            event_category: 'Projects',
            event_label: projectId
        });
    }
}

// ===== UTILIDADES =====
function getVisibleProjects() {
    const projectCards = document.querySelectorAll('.project-card:not(.hidden)');
    return projectCards.length;
}

function resetFilters() {
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reducir animaciones en móviles
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.style.animationDuration = '0.3s';
        });
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Agregar ARIA labels a los filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        button.setAttribute('aria-label', `Filtrar proyectos por ${filter}`);
    });
    
    // Configurar anuncios para lectores de pantalla
    const projectsContainer = document.querySelector('.projects-content');
    if (projectsContainer) {
        projectsContainer.setAttribute('aria-live', 'polite');
        projectsContainer.setAttribute('aria-atomic', 'false');
    }
}

// ===== INICIALIZACIÓN ADICIONAL =====
window.addEventListener('load', () => {
    optimizeForMobile();
    enhanceAccessibility();
});

// ===== EXPORTAR FUNCIONES GLOBALES =====
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;