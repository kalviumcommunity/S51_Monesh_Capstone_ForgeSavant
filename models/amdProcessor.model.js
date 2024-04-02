const mongoose = require('mongoose');

const AMDProcessorSchema = new mongoose.Schema({
  on: { type: String, default: "on" },
  Model: { type: String, required: true },
  Family: { type: String, required: true },
  Line: { type: String, required: true },
  Platform: { type: String, required: true },
  Product_ID_Tray: { type: String, required: true },
  Product_ID_Boxed: { type: String, required: true },
  Product_ID_MPK: { type: String },
  Launch_Date: { type: String },
  Num_of_CPU_Cores: { type: Number, required: true },
  Num_of_Threads: { type: Number, required: true },
  Graphics_Core_Count: { type: String },
  Base_Clock: { type: String, required: true },
  Max_Boost_Clock: { type: String, required: true },
  All_Core_Boost_Speed: { type: String },
  L1_Cache: { type: String, required: true },
  L2_Cache: { type: String, required: true },
  L3_Cache: { type: String, required: true },
  One_kU_Pricing: { type: String },
  Unlocked_for_Overclocking: { type: String, required: true },
  Processor_Technology_for_CPU_Cores: { type: String, required: true },
  CPU_Socket: { type: String, required: true },
  Socket_Count: { type: String },
  PCI_Express_Version: { type: String, required: true },
  Thermal_Solution_PIB: { type: String, required: true },
  Recommended_Cooler: { type: String },
  Thermal_Solution_MPK: { type: String },
  Default_TDP: { type: String, required: true },
  AMD_Configurable_TDP_cTDP: { type: String },
  Max_Operating_Temperature_Tjmax: { type: String, required: true },
  OS_Support: { type: String, required: true },
  System_Memory_Specification: { type: String, required: true },
  System_Memory_Type: { type: String, required: true },
  Memory_Channels: { type: Number, required: true },
  Per_Socket_Mem_BW: { type: String },
  Graphics_Frequency: { type: String },
  Graphics_Model: { type: String, required: true },
  Supported_Technologies: { type: String, required: true },
  Workload_Affinity: { type: String },
  AMD_Ryzen_AI: { type: String },
  FIPS_Certification: { type: String, required: true },
  FIPS_Certification_Links: { type: String }
});

// Create a model based on the schema
const AmdProcessor = mongoose.model('amdprocessors', AMDProcessorSchema);

module.exports = AmdProcessor;
