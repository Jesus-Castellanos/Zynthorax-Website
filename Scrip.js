
"use strict";

const CONTRACT_ADDRESS =
    "0xeBa58801660FBF7e36646Ac24C2868580Da4B213";

const EXPLORER_URL =
    `https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}`;

const translations = {
    es: {
        navToken: "El token",
        navEcosystem: "Ecosistema",
        navContract: "Contrato",
        networkStatus: "ACTIVO EN RED DE PRUEBAS",
        heroEyebrow: "UNA NUEVA DIMENSIÓN DIGITAL",
        heroTitle: 'La utilidad digital <span>evoluciona.</span>',
        heroDescription:
            "Descubre Zynthorax, un proyecto de token digital diseñado para explorar nuevas posibilidades de utilidad dentro de un ecosistema conectado.",
        exploreButton: 'Explorar ZHX <span aria-hidden="true">↗</span>',
        contractButton: "Ver contrato",
        heroNote: "Actualmente disponible únicamente en Base Sepolia.",
        statName: "NOMBRE DEL TOKEN",
        statNameDetail: "Ecosistema digital",
        statSymbol: "SÍMBOLO",
        statSymbolDetail: "Token ERC-20",
        statSupply: "SUMINISTRO INICIAL",
        statSupplyDetail: "ZHX · 18 decimales",
        statNetwork: "RED DE PRUEBAS",
        ecosystemEyebrow: "VISIÓN DEL PROYECTO",
        ecosystemTitle: 'Construido para una <span>utilidad real.</span>',
        ecosystemDescription:
            "Zynthorax busca explorar la integración de activos digitales en servicios y experiencias digitales. Sus usos futuros dependerán del desarrollo del proyecto.",
        featureOneTitle: "Tecnología blockchain",
        featureOneDescription:
            "Un token ERC-20 desplegado en una red compatible con Ethereum para realizar pruebas públicas.",
        featureTwoTitle: "Utilidad digital",
        featureTwoDescription:
            "Una visión orientada a explorar el uso de ZHX dentro de servicios digitales.",
        featureThreeTitle: "Desarrollo transparente",
        featureThreeDescription:
            "Información del contrato y acceso al explorador público para consultar sus datos.",
        contractEyebrow: "INFORMACIÓN ON-CHAIN",
        contractTitle: "Consulta el contrato.",
        contractDescription:
            "Consulta la dirección del contrato de prueba de Zynthorax directamente en BaseScan.",
        contractAddressLabel: "DIRECCIÓN DEL CONTRATO · BASE SEPOLIA",
        copyButton: "Copiar",
        copySuccess: "¡Dirección copiada!",
        copyError:
            "No se pudo copiar automáticamente. Selecciona y copia la dirección.",
        explorerButton: "Ver en BaseScan ↗",
        testnetWarning:
            "⚠ Este es un contrato de prueba en Base Sepolia. ZHX aquí no representa un token de producción.",
        disclaimer:
            "Zynthorax está en desarrollo. La información de este sitio es informativa y no constituye una oferta de inversión ni una promesa de rentabilidad.",
        footerText: "Proyecto en desarrollo.",
        footerExplorer: "Explorar contrato ↗"
    },

    en: {
        navToken: "The token",
        navEcosystem: "Ecosystem",
        navContract: "Contract",
        networkStatus: "ACTIVE ON TESTNET",
        heroEyebrow: "A NEW DIGITAL DIMENSION",
        heroTitle: 'Digital utility <span>evolves.</span>',
        heroDescription:
            "Discover Zynthorax, a digital token project exploring new utility possibilities within a connected ecosystem.",
        exploreButton: 'Explore ZHX <span aria-hidden="true">↗</span>',
        contractButton: "View contract",
        heroNote: "Currently available exclusively on Base Sepolia.",
        statName: "TOKEN NAME",
        statNameDetail: "Digital ecosystem",
        statSymbol: "SYMBOL",
        statSymbolDetail: "ERC-20 token",
        statSupply: "INITIAL SUPPLY",
        statSupplyDetail: "ZHX · 18 decimals",
        statNetwork: "TEST NETWORK",
        ecosystemEyebrow: "PROJECT VISION",
        ecosystemTitle: 'Built for <span>real utility.</span>',
        ecosystemDescription:
            "Zynthorax aims to explore the integration of digital assets into digital services and experiences. Future use cases will depend on the project's development.",
        featureOneTitle: "Blockchain technology",
        featureOneDescription:
            "An ERC-20 token deployed on an Ethereum-compatible network for public testing.",
        featureTwoTitle: "Digital utility",
        featureTwoDescription:
            "A vision focused on exploring ZHX use within digital services.",
        featureThreeTitle: "Transparent development",
        featureThreeDescription:
            "Contract information and access to a public explorer to inspect its data.",
        contractEyebrow: "ON-CHAIN INFORMATION",
        contractTitle: "Explore the contract.",
        contractDescription:
            "View the Zynthorax test contract address directly on BaseScan.",
        contractAddressLabel: "CONTRACT ADDRESS · BASE SEPOLIA",
        copyButton: "Copy",
        copySuccess: "Address copied!",
        copyError:
            "Automatic copying failed. Select and copy the address manually.",
        explorerButton: "View on BaseScan ↗",
        testnetWarning:
            "⚠ This is a Base Sepolia test contract. ZHX here is not a production token.",
        disclaimer:
            "Zynthorax is under development. This website is for informational purposes and does not constitute an investment offer or a promise of returns.",
        footerText: "Project under development.",
        footerExplorer: "Explore contract ↗"
    }
};

let currentLanguage = "es";

const languageButton = document.getElementById("language-toggle");
const copyButton = document.getElementById("copy-address");
const copyStatus = document.getElementById("copy-status");
const contractAddressElement =
    document.getElementById("contract-address");

function setLanguage(language) {
    if (!translations[language]) {
        return;
    }

    currentLanguage = language;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const translation = translations[language][key];

        if (typeof translation === "string") {
            element.innerHTML = translation;
        }
    });

    languageButton.textContent = language === "es" ? "EN" : "ES";

    languageButton.setAttribute(
        "aria-label",
        language === "es"
            ? "Switch language to English"
            : "Cambiar idioma a español"
    );

    copyStatus.textContent = "";
}

languageButton.addEventListener("click", () => {
    setLanguage(currentLanguage === "es" ? "en" : "es");
});

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(CONTRACT_ADDRESS);
        copyStatus.textContent = translations[currentLanguage].copySuccess;
    } catch (error) {
        copyStatus.textContent = translations[currentLanguage].copyError;

        // Fallback: select the address so the user can copy it manually.
        const selection = window.getSelection();
        const range = document.createRange();

        range.selectNodeContents(contractAddressElement);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

document.getElementById("current-year").textContent =
    new Date().getFullYear();

// Keep the explorer destination aligned with the contract constant.
document.querySelectorAll('a[href*="sepolia.basescan.org/address/"]')
    .forEach((link) => {
        link.href = EXPLORER_URL;
    });

setLanguage("es");
