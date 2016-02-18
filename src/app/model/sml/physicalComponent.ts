import {
  AbstractSWEIdentifiable,
  SweVector,
  SweDataArray,
  SweDataRecord,
  SweTime,
  SweText
} from '../swe';
import { Point, Time } from '../gml';
import { AbstractProcess } from './core';
import { ProcessMethod } from './simpleProcess';

/**
 * A physical process where the spatial and temporal state of the process is
 * relevant.
 */
export abstract class AbstractPhysicalProcess extends AbstractProcess {
  /**
   * References the physical component or system (e.g. platform) to which to
   * which this component or system is attached.
   */
  attachedTo: string;
  /**
   * A spatial reference frame of the physical component itself; this reference
   * frame is absolute and defines the relationship of the reference frame to
   * the physical body of the component; position of the component relates this
   * reference frame to some external reference frame. Note that units are
   * specified in the position so they are not specified as part of the
   * SpatialFrame.
   */
  localReferenceFrame: SpatialFrame[] = [];
  /**
   * Supports local time reference frames such as "time past mission start".
   * Note that units are handled in timePosition so they are not specified in
   * the TemporalFrame.
   */
  localTimeFrame: TemporalFrame[] = [];
  /**
   * Provides positional information relating the component's spatial reference
   * frame to an external spatial reference frame. Positional information can be
   * given by location, by full body state, by a time-tagged trajectory, or by a
   * measuring or computational process.
   */
  position: Position[] = [];
  /**
   * Provides Time positions typically reference a local time frame to an
   * external time frame. For example, a timer-start-time might be given
   * relative to an "absolute" GPS time.
   */
  timePosition: SweTime[] = [];
}

/**
 * A PhysicalComponent is a physical process that will not be further divided
 * into smaller components.
 */
export class PhysicalComponent extends AbstractPhysicalProcess {
  /**
   * he method describes (as an algorithm or text) how the process takes the
   * input and, based on the parameter values, generates output values.
   */
  method: ProcessMethod;
}

/**
 * A general temporal frame such as a mission start time or timer start time.
 */
export class TemporalFrame extends AbstractSWEIdentifiable {
  /**
   * The origin should just describe context of the start of time (e.g. start of
   * local timer).
   */
  origin: string;
}

/**
 * A general spatial Cartesian Reference Frame where the axes and origin will be
 * defined textually relative to a physical component.
 */
export class SpatialFrame extends AbstractSWEIdentifiable {
  /**
   * A textual description of the origin of the reference frame relative to the
   * physical device (e.g. "the origin is at the point of attachment of the
   * sensor to the platform").
   */
  origin: string;
  /**
   * Axis with name attribute and a textual description of the relationship of
   * the axis to the physical device; the order of the axes listed determines
   * their relationship according to the right-handed rule (e.g. axis 1 cross
   * axis 2 = axis 3).
   */
  axis: Axis[];
}

export class Axis {
  name: string;
  description: string;
}

export type Position = Point
  | SweText
  | SweVector
  | SweDataRecord
  | SweDataArray
  | AbstractProcess;
