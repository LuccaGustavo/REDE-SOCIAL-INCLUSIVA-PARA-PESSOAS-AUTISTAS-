import { useEffect, useState } from "react";
import "./accessibility.css";

const DEFAULT_PREFERENCES = {
  darkMode: false,
  lowStimulus: false,
  animations: true,
  sounds: false,
  textSize: "medium",
};

function loadPreferences() {
  try {
    const saved = localStorage.getItem("kiwify-accessibility-preferences");
    return saved
      ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) }
      : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export default function AccessibilitySettings({ onSave }) {
  const [preferences, setPreferences] = useState(loadPreferences);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = preferences.darkMode ? "dark" : "light";
    root.dataset.stimulus = preferences.lowStimulus ? "low" : "normal";
    root.dataset.animations = preferences.animations ? "on" : "off";
    root.dataset.textSize = preferences.textSize;

    localStorage.setItem(
      "kiwify-accessibility-preferences",
      JSON.stringify(preferences),
    );
  }, [preferences]);

  function updatePreference(name, value) {
    setPreferences((current) => ({ ...current, [name]: value }));
    setSavedMessage("");
  }

  function savePreferences(event) {
    event.preventDefault();
    onSave?.(preferences);
    setSavedMessage("Preferências salvas com sucesso.");
  }

  function resetPreferences() {
    setPreferences(DEFAULT_PREFERENCES);
    onSave?.(DEFAULT_PREFERENCES);
    setSavedMessage("Preferências restauradas.");
  }

  return (
    <main className="accessibility-page" aria-labelledby="accessibility-title">
      <section className="accessibility-card">
        <header className="accessibility-header">
          <p className="eyebrow">Personalização</p>
          <h1 id="accessibility-title">Configurações de acessibilidade</h1>
          <p>
            Escolha uma experiência mais confortável para navegar pela nossa
            comunidade.
          </p>
        </header>

        <form onSubmit={savePreferences}>
          <fieldset>
            <legend>Visualização</legend>

            <label className="setting-row" htmlFor="dark-mode">
              <span>
                <strong>Modo escuro</strong>
                <small>Reduz a luminosidade da tela.</small>
              </span>
              <input
                id="dark-mode"
                type="checkbox"
                role="switch"
                checked={preferences.darkMode}
                onChange={(event) =>
                  updatePreference("darkMode", event.target.checked)
                }
              />
            </label>

            <label className="setting-row" htmlFor="low-stimulus">
              <span>
                <strong>Baixo estímulo visual</strong>
                <small>Suaviza cores e reduz elementos visuais.</small>
              </span>
              <input
                id="low-stimulus"
                type="checkbox"
                role="switch"
                checked={preferences.lowStimulus}
                onChange={(event) =>
                  updatePreference("lowStimulus", event.target.checked)
                }
              />
            </label>

            <div className="setting-row setting-row-column">
              <span>
                <strong>Tamanho do texto</strong>
                <small>Ajuste o tamanho para facilitar a leitura.</small>
              </span>
              <div className="text-size-options" role="group" aria-label="Tamanho do texto">
                {[
                  ["small", "Pequeno"],
                  ["medium", "Médio"],
                  ["large", "Grande"],
                ].map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    className={preferences.textSize === value ? "selected" : ""}
                    aria-pressed={preferences.textSize === value}
                    onClick={() => updatePreference("textSize", value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Movimento e som</legend>

            <label className="setting-row" htmlFor="animations">
              <span>
                <strong>Ativar animações</strong>
                <small>Permite transições e movimentos da interface.</small>
              </span>
              <input
                id="animations"
                type="checkbox"
                role="switch"
                checked={preferences.animations}
                onChange={(event) =>
                  updatePreference("animations", event.target.checked)
                }
              />
            </label>

            <label className="setting-row" htmlFor="sounds">
              <span>
                <strong>Ativar sons</strong>
                <small>Habilita sons de feedback quando disponíveis.</small>
              </span>
              <input
                id="sounds"
                type="checkbox"
                role="switch"
                checked={preferences.sounds}
                onChange={(event) =>
                  updatePreference("sounds", event.target.checked)
                }
              />
            </label>
          </fieldset>

          <div className="accessibility-actions">
            <button type="button" className="secondary-button" onClick={resetPreferences}>
              Restaurar padrão
            </button>
            <button type="submit" className="primary-button">
              Salvar preferências
            </button>
          </div>
          <p className="save-message" role="status" aria-live="polite">
            {savedMessage}
          </p>
        </form>
      </section>
    </main>
  );
}

export { DEFAULT_PREFERENCES, loadPreferences };
