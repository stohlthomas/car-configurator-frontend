import React, { useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { models, initialConfig } from '../../data';
// Styles
import './App.css';
// Components
import Menu from '../Menu';
import Footer from '../Footer';
import Settings from '../Settings';
import Summary from '../Summary';
import Preview from '../Preview';
import OrderSuccessPopup from '../OrderSuccessPopup';
import InteriorPreview from '../InteriorPreview';
import useLocalStorage from './useLocalStorage';
import { useHistory } from 'react-router-dom';
import { createOrder } from '../../api/Orders';
import { useState } from 'react';

const App = () => {
  const [currentStep, setCurrentStep] = useLocalStorage('currentStep', 0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [config, setConfig] = useLocalStorage('config', initialConfig?.['s'] ?? null);

  const history = useHistory();

  useEffect(() => {
    const queryParams = new URLSearchParams(history.location.search, { });
    console.log('Query params', queryParams.size);

    const paramsObj = {};

  
    for (const [key, value] of queryParams.entries()) {
      const values = value.split(',');
  
      console.log('values', values);
      if(values.length <= 1) {
        paramsObj[key] = value;
      } else {
        if (paramsObj[key]) {
            paramsObj[key] = paramsObj[key].concat(values);
        } else {
            paramsObj[key] = values;
        }
      }

      console.log('paramsObj', paramsObj);
  }
    setConfig(queryParams.size ? paramsObj : initialConfig?.['s']);
  }, []); // only run at first render

  useEffect(() => {
    console.log('Update config', config);
    const queryParams = objectToQueryParams(config);
    console.log('Update query params', queryParams);
    history.push({ search: queryParams });
  }, [config, history])

  const selectedModel = useMemo(() => {
    return models.find(model => model?.key === config?.model);
  }, [config]);

  const steps = useMemo(() => [
    {
      name: "Auto",
      settings: [
        {
          label: "Model auswählen",
          type: "text",
          prop: "model",
          options: models.map(model => ({
            value: model.key,
            label: model.name
          }))
        },
        {
          label: "Motorleistung auswählen",
          type: "text",
          prop: "car_type",
          options: selectedModel?.types ?? [],
          disclaimer_1: "Alle Autos verfügen über einen Dual-Motor-Allradantrieb, eine adaptive Luftfederung, erstklassige Innenausstattung und erstklassigen Sound.",
          disclaimer_2: "Der Tesla-Allradantrieb verfügt über zwei unabhängige Motoren, die das Drehmoment an den Vorder- und Hinterrädern digital steuern – für ein weitaus besseres Handling und eine bessere Traktionskontrolle. Ihr Auto kann mit beiden Motoren fahren, Sie müssen sich also keine Sorgen machen, dass Sie auf der Straße stecken bleiben."
        }
      ]
    },
    {
      name: "Außen",
      settings: [
        {
          label: "Farbe auswählen",
          type: "color",
          prop: "color",
          options: selectedModel?.colors ?? []
        },
        {
          label: "Felgen auswählen",
          type: "image",
          prop: "wheels",
          options: selectedModel?.wheels ?? []
        }
      ]
    },
    {
      name: "Innen",
      settings: [
        {
          label: "Innenausstattung auswählen",
          type: "text",
          prop: "interior_color",
          options: selectedModel?.interiorColors ?? []
        },
        {
          label: "Sonderausstattungen auswählen",
          type: "text",
          prop: "interior_layout",
          options: selectedModel?.interiorLayouts ?? [],
          multiSelect: true
        },
      ]
    },
    {
      name: "Zusammenfassung"
    }
  ], [selectedModel]);

  const totalPrice = useMemo(() => {
    const basePrice = selectedModel?.types?.find(
      type => type.value === config?.car_type
    )?.price ?? 0;
    const colorPrice = selectedModel?.colors?.find(
      color => color.value === config?.color
    )?.price ?? 0;
    const wheelsPrice = selectedModel?.wheels?.find(
      wheels => wheels.value === config?.wheels
    )?.price ?? 0;
    const interiorColorPrice = selectedModel?.interiorColors?.find(
      interiorColor => interiorColor.value === config?.interior_color
    )?.price ?? 0;
    
    const interiorLayout = selectedModel?.interiorLayouts?.filter(
      interiorLayout => config?.interior_layout.includes(interiorLayout.value)
    )

    const interiorLayoutPrice = Array.isArray(interiorLayout) ? interiorLayout.reduce((acc, layout) => acc + layout.price, 0)
    : interiorLayout?.price ?? 0;

    if (selectedModel?.interiorLayouts)

    return basePrice + colorPrice + wheelsPrice + interiorColorPrice + interiorLayoutPrice;
  }, [selectedModel, config]);

  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, [setCurrentStep]);

  const goToPrevStep = useCallback(() => {
    setCurrentStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
  }, [setCurrentStep]);

  const buyCarStep = useCallback(async () => {
    const order = {
      configuration: config,
      price: totalPrice,
    }
    await createOrder(order)

    setShowSuccessPopup(true);
  }, [config, totalPrice]);

  const goToNextStep = useCallback(() => {
    if (currentStep === steps.length - 1) {
      buyCarStep();
    }
    setCurrentStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  }, [setCurrentStep, steps.length, currentStep, buyCarStep]);


  const reset = () => {
    setCurrentStep(0);
    setConfig(initialConfig?.['s']);
    setShowSuccessPopup(false);
  }


  const handleChangeModel = useCallback((model) => {
    setConfig(initialConfig[model]);
  }, [setConfig]);

  const handleOnSelectOption = useCallback((prop, value) => {
    if (prop === "model") {
      handleChangeModel(value);
    } else {
      setConfig(prevConfig => ({
        ...prevConfig,
        [prop]: value
      }));
    }
  }, [handleChangeModel, setConfig]);

  const handleOnMultiSelectOption = useCallback((prop, value) => {
    if (prop === "model") {
      handleChangeModel(value);
    } else {
      const lastValue = config[prop]
      console.log('lastValue', lastValue);
      console.log('value', Array.isArray(lastValue) ? lastValue.concat([value]) : [value]);

      let newValue = value
      if (Array.isArray(lastValue)) {
        newValue = lastValue.includes(value) ? lastValue.filter(v => v !== value) : lastValue.concat([value])
      } else {
        newValue = [value]
      }
       
      setConfig(prevConfig => ({
        ...prevConfig,
        [prop]:newValue
      }));
    }
  }, [handleChangeModel, setConfig, config]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  console.log(selectedModel);
  console.log(config);

  return (
    <div className="app">
      {showSuccessPopup && <OrderSuccessPopup
        onReset={reset}
      />}
      <Menu
        items={steps.map(step => step.name)}
        selectedItem={currentStep}
        onSelectItem={goToStep}
      />
      <main className="app-content">
        {
          steps[currentStep]?.name === "interior" ? (
            <InteriorPreview
              interior={selectedModel?.interiorColors.find(
                interiorColor => interiorColor.value === config.interior_color
              )}
            />
          ) : (
            <Preview
              config={config}
              models={models}
              showAllModels={isFirstStep}
              showSpecs={!isLastStep}
              onChangeModel={handleChangeModel}
            />
          )
        }
        {
          isLastStep ? (
            <Summary
              config={config}
              models={models}
              totalPrice={totalPrice}
            />
          ) : (
            <Settings
              config={config}
              settings={steps[currentStep].settings}
              onSelectOption={handleOnSelectOption}
              onSelectMultiOption={handleOnMultiSelectOption}
            />
          )
        }
      </main>
      <Footer
        totalPrice={totalPrice}
        disablePrev={isFirstStep}
        disableNext={isLastStep}
        onClickPrev={goToPrevStep}
        onClickNext={goToNextStep}
      />
    </div>
  );
};

function objectToQueryParams(config) {
  console.log('config', config);
  return Object.keys(config)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(config[key].toString())}`)
    .join('&');
}

// export default App;

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
