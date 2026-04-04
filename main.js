
class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-card');

        const title = document.createElement('h1');
        title.textContent = 'Lotto Number Generator';

        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers');

        const button = document.createElement('button');
        button.textContent = 'Generate Numbers';
        button.addEventListener('click', () => this.generateNumbers(numbersContainer));

        const style = document.createElement('style');
        style.textContent = `
            .lotto-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 2rem;
                background-color: #f0f0f0;
                border-radius: 1rem;
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                text-align: center;
            }
            h1 {
                margin-bottom: 2rem;
                color: #333;
            }
            .numbers {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .number {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 4rem;
                height: 4rem;
                background-color: #fff;
                border-radius: 50%;
                font-size: 1.5rem;
                font-weight: bold;
                color: #333;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            button {
                padding: 1rem 2rem;
                border: none;
                border-radius: 0.5rem;
                background-color: #4CAF50;
                color: white;
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #45a049;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(numbersContainer);
        wrapper.appendChild(button);
    }

    generateNumbers(container) {
        container.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.setAttribute('class', 'number');
            numberElement.textContent = number;
            container.appendChild(numberElement);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);
