document.addEventListener('DOMContentLoaded', () => {
  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
            
            // Add animation
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            const categories = card.getAttribute('data-category');
            
            if (categories && categories.includes(filterValue)) {
              card.style.display = 'block';
              
              // Add animation
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 100);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              
              // Hide after animation completes
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          }
        });
      });
    });
  }
  
  // Project modal functionality
  const projectLinks = document.querySelectorAll('[data-project]');
  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  
  if (projectLinks.length > 0 && projectModal && modalBody && modalClose) {
    // Project details data
    const projectData = {
      'retail-sales-dashboard': {
        title: 'Retail Sales Dashboard',
        fullDescription: `
          <p>This project involved creating a comprehensive sales analytics dashboard for a multinational retail client. The dashboard provides real-time insights into sales performance across different regions, product categories, and customer segments.</p>
          
          <h3>Challenge</h3>
          <p>The client was struggling to consolidate data from multiple sources and needed a unified view of their sales performance. They required a solution that could handle large volumes of data while providing intuitive visualizations for decision-makers.</p>
          
          <h3>Solution</h3>
          <p>I developed a custom Tableau dashboard that:
            <ul>
              <li>Integrates data from their ERP system, CRM, and e-commerce platform</li>
              <li>Provides daily, weekly, monthly, and yearly views of sales metrics</li>
              <li>Enables drill-down functionality to analyze performance by region, store, and product category</li>
              <li>Includes predictive analytics for forecasting future sales trends</li>
            </ul>
          </p>
          
          <h3>Results</h3>
          <p>The dashboard helped the client identify underperforming regions and products, leading to strategic changes that increased overall sales by 12% within six months. The solution also reduced reporting time by 80%, allowing the analytics team to focus on generating insights rather than compiling reports.</p>
          
          <h3>Technologies Used</h3>
          <div class="tech-tags">
            <span class="project-tag">Tableau</span>
            <span class="project-tag">SQL</span>
            <span class="project-tag">Excel</span>
            <span class="project-tag">ETL Pipelines</span>
          </div>
        `,
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      'churn-prediction': {
        title: 'Customer Churn Prediction',
        fullDescription: `
          <p>This project focused on developing a machine learning model to predict customer churn for a subscription-based SaaS company. I built a model that achieved 87% accuracy in identifying customers at risk of cancelling their subscriptions.</p>
          
          <h3>Challenge</h3>
          <p>The client was experiencing an increasing churn rate and wanted to proactively identify at-risk customers before they cancelled. They needed a solution that could not only predict churn but also provide insights into the factors driving customer decisions.</p>
          
          <h3>Solution</h3>
          <p>I implemented a comprehensive churn prediction system that included:
            <ul>
              <li>Data preprocessing and feature engineering from customer usage patterns</li>
              <li>A Random Forest model for churn prediction with cross-validation</li>
              <li>Feature importance analysis to identify key churn factors</li>
              <li>Integration with their CRM system for automated alerts</li>
            </ul>
          </p>
          
          <h3>Results</h3>
          <p>The model successfully identified 87% of churning customers before they cancelled, allowing the client's customer success team to intervene with targeted retention strategies. This resulted in a 23% reduction in overall churn rate and an estimated $1.2M in preserved annual recurring revenue.</p>
          
          <h3>Technologies Used</h3>
          <div class="tech-tags">
            <span class="project-tag">Python</span>
            <span class="project-tag">Scikit-Learn</span>
            <span class="project-tag">Pandas</span>
            <span class="project-tag">Matplotlib</span>
            <span class="project-tag">Jupyter Notebooks</span>
          </div>
        `,
        image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      'global-health-viz': {
        title: 'Global Health Indicators',
        fullDescription: `
          <p>This data visualization project explores key health metrics across 180+ countries, examining the relationships between health outcomes and socioeconomic factors. The interactive visualization allows users to explore global health patterns and correlations between different indicators.</p>
          
          <h3>Challenge</h3>
          <p>There was a need for a comprehensive yet accessible visualization of global health data that could be used by researchers, policy makers, and the general public. The challenge was to present complex, multidimensional data in an intuitive way while preserving the depth of information.</p>
          
          <h3>Solution</h3>
          <p>I created an interactive Power BI dashboard with multiple visualization types:
            <ul>
              <li>Choropleth maps showing global distribution of health metrics</li>
              <li>Scatter plots to reveal correlations between health and economic indicators</li>
              <li>Time series visualizations showing health trends over the past 20 years</li>
              <li>Comparative analyses between regions and income groups</li>
            </ul>
          </p>
          
          <h3>Results</h3>
          <p>The visualization has been used by several non-profit organizations and educational institutions to inform health policy discussions and research. It provides clear evidence of the relationships between economic development, healthcare investment, and population health outcomes.</p>
          
          <h3>Technologies Used</h3>
          <div class="tech-tags">
            <span class="project-tag">Power BI</span>
            <span class="project-tag">R</span>
            <span class="project-tag">GIS</span>
            <span class="project-tag">DAX</span>
          </div>
        `,
        image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      'ecommerce-analysis': {
        title: 'E-commerce Market Analysis',
        fullDescription: `
          <p>This project involved a comprehensive market analysis for an e-commerce platform looking to optimize their product offerings and pricing strategy. I analyzed customer behavior, competitor pricing, and market trends to provide actionable recommendations.</p>
          
          <h3>Challenge</h3>
          <p>The client was facing increasing competition and needed to understand which product categories to focus on, how to optimize pricing, and how to improve customer retention in a crowded marketplace.</p>
          
          <h3>Solution</h3>
          <p>I conducted a multi-phase analysis that included:
            <ul>
              <li>Comprehensive customer segmentation based on purchasing behavior</li>
              <li>Price elasticity analysis for key product categories</li>
              <li>Competitive analysis of 15 major competitors</li>
              <li>Market trend forecasting to identify growth opportunities</li>
            </ul>
          </p>
          
          <h3>Results</h3>
          <p>The analysis identified three high-potential product categories that the client was underserving. It also revealed pricing inefficiencies in 20% of their catalog. After implementing the recommendations, the client saw a 15% increase in average order value and a 22% improvement in customer retention rate.</p>
          
          <h3>Technologies Used</h3>
          <div class="tech-tags">
            <span class="project-tag">SQL</span>
            <span class="project-tag">Excel</span>
            <span class="project-tag">Tableau</span>
            <span class="project-tag">Google Analytics</span>
          </div>
        `,
        image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      'supply-chain-forecasting': {
        title: 'Predictive Supply Chain Model',
        fullDescription: `
          <p>This project involved developing a time-series forecasting model to predict inventory needs and optimize supply chain operations for a manufacturing company. The model reduced stockouts while simultaneously decreasing inventory holding costs.</p>
          
          <h3>Challenge</h3>
          <p>The client was experiencing both stockouts and excess inventory issues due to inefficient demand forecasting. They needed a solution that could provide accurate predictions across thousands of SKUs with varying demand patterns.</p>
          
          <h3>Solution</h3>
          <p>I built a prediction system that incorporated:
            <ul>
              <li>LSTM neural networks for time-series forecasting</li>
              <li>Feature engineering that incorporated seasonality, trends, and external factors</li>
              <li>Automated inventory optimization based on forecast confidence intervals</li>
              <li>An implementation strategy that prioritized high-value and critical components</li>
            </ul>
          </p>
          
          <h3>Results</h3>
          <p>The model achieved a 35% improvement in forecast accuracy compared to the client's previous system. This translated to a 23% reduction in stockouts and a 18% reduction in inventory holding costs, resulting in approximately $3.2M in annual savings.</p>
          
          <h3>Technologies Used</h3>
          <div class="tech-tags">
            <span class="project-tag">Python</span>
            <span class="project-tag">TensorFlow</span>
            <span class="project-tag">Matplotlib</span>
            <span class="project-tag">NumPy</span>
            <span class="project-tag">Pandas</span>
          </div>
        `,
        image: 'https://images.pexels.com/photos/5926398/pexels-photo-5926398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      'marketing-campaign-analysis': {
        title: 'Marketing Campaign Analysis',
        fullDescription: `
          <p>This project focused on analyzing the performance of multi-channel marketing campaigns for a B2B SaaS company. I provided insights that improved campaign ROI by 18% and optimized budget allocation across digital channels.</p>
          
          <h3>Challenge</h3>
          <p>The client was investing substantially in various marketing channels but lacked visibility into which campaigns were driving qualified leads and conversions. They needed to optimize their marketing spend across channels while improving overall campaign effectiveness.</p>
          
          <h3>Solution</h3>
          <p>I implemented a comprehensive analytics approach that included:
            <ul>
              <li>End-to-end attribution modeling to track customer journeys</li>
              <li>Channel performance analysis with conversion rate optimization</li>
              <li>A/B testing framework for campaign elements</li>
              <li>Cohort analysis to understand long-term customer value by acquisition channel</li>
            </ul>
          </p>
          
          <h3>Results</h3>
          <p>The analysis revealed that 40% of the marketing budget was allocated to channels that produced only 15% of qualified leads. After redistributing the budget based on my recommendations, the client saw an 18% improvement in marketing ROI and a 27% increase in marketing-qualified leads without increasing overall spend.</p>
          
          <h3>Technologies Used</h3>
          <div class="tech-tags">
            <span class="project-tag">Google Analytics</span>
            <span class="project-tag">Power BI</span>
            <span class="project-tag">SQL</span>
            <span class="project-tag">Excel</span>
            <span class="project-tag">Attribution Modeling</span>
          </div>
        `,
        image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    };
    
    // Open modal with project details
    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const projectId = link.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
          modalBody.innerHTML = `
            <div class="modal-project">
              <img src="${project.image}" alt="${project.title}" class="modal-project-image">
              <h2 class="modal-project-title">${project.title}</h2>
              <div class="modal-project-description">
                ${project.fullDescription}
              </div>
            </div>
          `;
          
          projectModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside of content
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});